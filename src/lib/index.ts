import { buildTrie, minimizeTrie } from "./TrieBuilder";
import { Graph } from "./utils";

const generateTrieGraph = (...words: [string, ...string[]]) => {
    const graph = new Graph();
    buildTrie(graph, words);
    return graph;
};

const minimizeTrieGraph = (graph: Graph) => {
    minimizeTrie(graph);
    return graph;
};

const generateDawg = (...words: [string, ...string[]]) => {
    const graph = new Graph();
    buildTrie(graph, words);
    minimizeTrie(graph);
    return graph;
};

export default {
    generateTrieGraph,
    minimizeTrieGraph,
    generateDawg,
};
