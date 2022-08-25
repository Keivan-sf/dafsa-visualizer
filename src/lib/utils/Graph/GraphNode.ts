import { generateID } from "./utils";
import { edgeNode, deleteEdgeOption } from "../../Types";
import { Graph } from ".";

export class GraphNode {
    public id = generateID();
    public edges: edgeNode[] = [];
    public parentEdge: edgeNode[] = [];
    public isEndNode: boolean = false;

    constructor(public NodeManager: Graph, public isRoot = false) {
        this.NodeManager.addNode(this);
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
        const node = this.NodeManager.getNode(nodeID);
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
