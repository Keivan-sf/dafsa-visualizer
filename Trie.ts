let id = 0;
const generateID = () => ++id;
type edgeNode = { char: string; node: GraphNode };
type results = { numberOfNodes: number; words: string[] };

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
    for (let i = word.length - 1; i >= 0; i--) {
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

BuildTrie("test", "testing", "tub", "tubs", "rows", "row");
extractWords();

console.log(`edge:`, root.edges[0]);
console.log(NodeManager.calculateEdgeWord({ char: "", node: root }, "", []));
