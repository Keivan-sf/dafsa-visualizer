import { Graph, GraphNode } from "../utils";
import { createWord } from "./letterNodeCreator";
import { findPrefix } from "./prefixFinder";

export const buildTrie = (NodeManager: Graph, words: string[]) => {
    new GraphNode(NodeManager, true);
    for (const word of words) {
        const prefix = findPrefix(word, NodeManager);
        if (!prefix)
            throw Error(
                "No prefix has been found, meaning root node is not initialized"
            );
        createWord(prefix.neededLetters, prefix.node, NodeManager);
    }
};

export const minimizeTrie = (NodeManager: Graph) => {
    let stack = [...NodeManager.nodes];
    const visitedNodesIDs: number[] = [];
    while (stack[0]) {
        if (visitedNodesIDs.includes(stack[0].id)) {
            stack.shift();
            continue;
        }
        const node = stack[0];
        const duplicates: [GraphNode, GraphNode, ...GraphNode[]] =
            NodeManager.nodes.filter(
                (n) => n.id != node.id && NodeManager.compareNodes(node, n)
            ) as [GraphNode, GraphNode, ...GraphNode[]];

        if (duplicates.length > 0) {
            duplicates.unshift(node);
            NodeManager.mergeNodes(duplicates);
        }
        visitedNodesIDs.push(node.id);
        stack = [...NodeManager.nodes];
    }
};
