import { GraphNode } from ".";
import { edgeNode } from "../../Types";
import { convertGraphToVizGraph } from "./utils";

export class Graph {
    nodes: GraphNode[] = [];
    getNode(nodeID: number): GraphNode {
        const node = this.nodes.find((n) => n.id === nodeID);
        if (!node) throw new Error(`Node #${nodeID} not found`);
        return node;
    }
    addNode(node: GraphNode) {
        this.nodes.push(node);
    }
    getShortRootSummary() {
        return this.nodes[0].getSummery();
    }

    calculateEdgeWord(edge: edgeNode, prefix: string, words: string[]) {
        prefix += edge.char;
        if (edge.node.isEndNode) {
            words.push(prefix);
        }

        for (const childEdge of edge.node.edges) {
            this.calculateEdgeWord(childEdge, prefix, words);
        }
        return words;
    }

    compareNodes(node1: GraphNode, node2: GraphNode) {
        const NODE_1_EDGES = this.calculateEdgeWord(
            { char: "", node: node1 },
            "",
            []
        );
        const NODE_2_EDGES = this.calculateEdgeWord(
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

    deleteNode(nodeID: number) {
        const node = this.getNode(nodeID);
        for (const child of node.edges) {
            node.removeChildEdge(child.char, child.node.id);
        }
        for (const parent of node.parentEdge) {
            node.removeParentEdge(parent.char, parent.node.id);
        }
        const deleteIndex = this.nodes.findIndex((n) => n.id === nodeID);
        this.nodes.splice(deleteIndex, 1);
    }

    mergeNodes(nodes: [GraphNode, GraphNode, ...GraphNode[]]) {
        const mainNode = nodes.shift()!;
        for (const node of nodes) {
            for (const parent of node.parentEdge) {
                parent.node.addChildEdge(parent.char, mainNode.id);
            }
            this.deleteNode(node.id);
        }
    }

    convertToVizGraph() {
        return convertGraphToVizGraph(this);
    }
}
