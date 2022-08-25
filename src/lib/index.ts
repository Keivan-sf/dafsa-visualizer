import { buildTrie } from "./TrieBuilder";
import { Graph } from "./utils";

const generateTrieGraph = (...words: [string, ...string[]]) => {
    const graph = new Graph();
    buildTrie(graph, words);
    return graph.getShortRootSummary();
};

const minimizeTrieGraph = (graph: Graph) => {};

export default {
    generateTrieGraph,
    minimizeTrieGraph,
};
