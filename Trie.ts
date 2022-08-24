let id = 0;
const generateID = () => ++id;
type edgeNode = { char: string; node: GraphNode };
type results = { numberOfNodes: number; words: string[] };

type deleteEdgeOption = {
    /**
     * If **true**, it will call {@link GraphNode.removeParentEdge removeParentEdge} and
     * {@link GraphNode.removeChildEdge removeChildEdge} on both nodes and delete the
     * edge bidirectionally
     */
    bidirectional?: boolean;
};

class NodeManager {
    static nodes: GraphNode[] = [];
    static getNode(nodeID: number): GraphNode {
        const node = NodeManager.nodes.find((n) => n.id === nodeID);
        if (!node) throw new Error(`Node #${nodeID} not found`);
        return node;
    }
    static addNode(node: GraphNode) {
        NodeManager.nodes.push(node);
    }
    static getShortRootSummary() {
        return this.nodes[0].getSummery();
    }

    /**
     * { 'a' , ...} , '' , [];
     * - { 'b' , ...} , 'a' , [];
     * -- { 'c'} , 'ab' , [];
     * ---'abc' ++
     *
     * - {'d' , ...} , 'a' , ['abc'];
     * -- { 'r' } , 'ad' , ['abc'];
     * --- 'adr' ++
     *
     * -- {'t' , ...} , 'ad' , ['abc' , 'adr'];
     * --- {'W'} , 'adt' , ['abc' , 'adr'];
     * ---- 'adtw' +++
     *
     * ['abc' , 'adr' , 'adtw']
     *
     */

    static calculateEdgeWord(edge: edgeNode, prefix: string, words: string[]) {
        prefix += edge.char;
        if (edge.node.isEndNode) {
            words.push(prefix);
        }

        for (const childEdge of edge.node.edges) {
            NodeManager.calculateEdgeWord(childEdge, prefix, words);
        }
        return words;
    }

    static compareNodes(node1: GraphNode, node2: GraphNode) {
        const NODE_1_EDGES = NodeManager.calculateEdgeWord(
            { char: "", node: node1 },
            "",
            []
        );
        const NODE_2_EDGES = NodeManager.calculateEdgeWord(
            { char: "", node: node2 },
            "",
            []
        );
        if (NODE_1_EDGES.length !== NODE_2_EDGES.length) return false;
        for (const edge of NODE_2_EDGES) {
            const duplicate = NODE_1_EDGES.findIndex((e) => e === edge);
            if (duplicate === -1) return false;
            NODE_1_EDGES.splice(duplicate, 1);
        }
        if (NODE_1_EDGES.length > 0) return false;
        return true;
    }

    static deleteNode(nodeID: number) {
        const node = NodeManager.getNode(nodeID);
        for (const child of node.edges) {
            node.removeChildEdge(child.char, child.node.id);
        }
        for (const parent of node.parentEdge) {
            node.removeParentEdge(parent.char, parent.node.id);
        }
        const deleteIndex = NodeManager.nodes.findIndex((n) => n.id === nodeID);
        NodeManager.nodes.splice(deleteIndex, 1);
    }

    static mergeNodes(...nodes: [GraphNode, GraphNode, ...GraphNode[]]) {
        const mainNode = nodes.shift()!;
        for (const node of nodes) {
            for (const parent of node.parentEdge) {
                parent.node.addChildEdge(parent.char, mainNode.id);
            }
            NodeManager.deleteNode(node.id);
        }
    }
}

class GraphNode {
    public id = generateID();
    public edges: edgeNode[] = [];
    public parentEdge: edgeNode[] = [];
    public isEndNode: boolean = false;

    constructor(public isRoot = false) {
        NodeManager.addNode(this);
    }

    getSummery(): any {
        const summary = {
            id: this.id,
            edges: this.edges.map((e) => ({
                char: e.char,
                node: e.node.getSummery(),
            })),
        };
        return summary;
    }

    addParentEdge(edge: edgeNode) {
        if (edge.char === "EOW") this.isEndNode = true;
        this.parentEdge.push(edge);
    }

    addChildEdge(character: string, nodeID: number) {
        const node = NodeManager.getNode(nodeID);
        this.edges.push({ char: character, node });
        node.addParentEdge({ char: character, node: this });
    }

    removeParentEdge(
        character: string,
        nodeID: number,
        options: deleteEdgeOption = { bidirectional: true }
    ) {
        const index = this.parentEdge.findIndex(
            (e) => e.char === character && e.node.id === nodeID
        );
        if (index === -1)
            throw new Error(
                `A parent edge with char:${character} and id: ${nodeID} does not exist`
            );
        const deletedEdge = this.parentEdge.splice(index, 1);
        if (options?.bidirectional ?? true)
            deletedEdge[0].node.removeChildEdge(character, this.id, {
                bidirectional: false,
            });
    }

    removeChildEdge(
        character: string,
        nodeID: number,
        options: deleteEdgeOption = { bidirectional: true }
    ) {
        const index = this.edges.findIndex(
            (e) => e.char === character && e.node.id === nodeID
        );
        if (index === -1)
            throw new Error(
                `A child edge with char:${character} and id: ${nodeID} does not exist`
            );
        const deletedEdge = this.edges.splice(index, 1);
        if (options?.bidirectional ?? true)
            deletedEdge[0].node.removeParentEdge(character, this.id, {
                bidirectional: false,
            });
    }

    getParentEdge() {
        return this.parentEdge;
    }

    evaluateParentWord() {
        let currentNode: this | GraphNode = this;
        let prefix = "";
        while (!currentNode.isRoot) {
            if (!currentNode.isEndNode) {
                prefix = currentNode.parentEdge[0].char + prefix;
            }
            currentNode = currentNode.parentEdge[0].node;
        }
        return prefix;
    }
}

const root = new GraphNode(true);

function findPrefix(word: string) {
    for (let i = word.length; i >= 0; i--) {
        const sliced = word.slice(0, i);
        for (const node of NodeManager.nodes) {
            if (node.evaluateParentWord() === sliced) {
                let passedNode = !node.isEndNode
                    ? node
                    : node.parentEdge[0].node;
                return { node: passedNode, neededLetters: word.slice(i) };
            }
        }
    }
}

function createWord(word: string, startNode: GraphNode) {
    let currentNode = startNode;
    const lastNode = new GraphNode();
    for (let i of word) {
        const newNode = new GraphNode();
        currentNode.addChildEdge(i, newNode.id);
        currentNode = newNode;
    }
    currentNode.addChildEdge("EOW", lastNode.id);
    return lastNode;
}

const BuildTrie = (...words: string[]) => {
    for (const word of words) {
        const prefix = findPrefix(word);
        createWord(prefix?.neededLetters!, prefix?.node!);
    }
};

const extractWords = (): results => {
    const data: results = {
        words: [],
        numberOfNodes: NodeManager.nodes.length,
    };
    for (const node of NodeManager.nodes) {
        if (node.isEndNode) data.words.push(node.evaluateParentWord());
    }
    console.table(data);
    return data;
};

BuildTrie("tap", "taps" , "tuple" , "tuples" , "row" , "rows");
extractWords();

// const minimizeTrie = () => {
//     const nodes = NodeManager.nodes;
//     for (const node of NodeManager.nodes) {
        
//     }
// };

console.dir(NodeManager.getShortRootSummary() , {depth: 25});
const toCompare = [
    NodeManager.getNode(8),
    NodeManager.getNode(13),
]
console.log(NodeManager.compareNodes(toCompare[0] , toCompare[1]))
// console.log(`edge:`, root.edges[0]);
// console.log(NodeManager.calculateEdgeWord({ char: "", node: root }, "", []));
