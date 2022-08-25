import { Graph, GraphNode } from "../../utils";

/**
 * @returns last node of the word which is directed with `EOW`
 */
export const createWord = (
    word: string,
    startNode: GraphNode,
    NodeManager: Graph
): GraphNode => {
    let currentNode = startNode;
    const lastNode = new GraphNode(NodeManager);

    for (let i of word) {
        const newNode = new GraphNode(NodeManager);
        currentNode.addChildEdge(i, newNode.id);
        currentNode = newNode;
    }

    currentNode.addChildEdge("EOW", lastNode.id);
    return lastNode;
};
