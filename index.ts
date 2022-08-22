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

function createWord(word: string) {
    let currentNode = root;
    const lastNode = new GraphNode();
    for (let i of word) {
        const newNode = new GraphNode();
        currentNode.addChildEdge(i, newNode.id);
        currentNode = newNode;
    }
    currentNode.addChildEdge("EOW", lastNode.id);
    return lastNode;
}

const last = createWord("test 2 2");
console.log(last.evaluateParentWord());
