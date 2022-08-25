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
