let id = 0;
const generateID = () => ++id;
type edgeNode = { char: string; node: GraphNode };

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
}

class GraphNode {
    public id = generateID();
    public edges: edgeNode[] = [];
    public parentEdge: edgeNode[] = [];
    public isEndNode: boolean = false;

    constructor(public isRoot = false) {
        NodeManager.addNode(this);
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
        if (this.isRoot) return "";
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
                return { node, neededLetters: word.slice(i) };
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
        const prefix = findPrefix("tesing");
        createWord(prefix?.neededLetters!, prefix?.node!);
    }
};

BuildTrie("test" , "tesing");

// console.dir(NodeManager, { depth: 10 });
