import { buildTrie, minimizeTrie } from "./TrieBuilder";
import { Graph } from "./utils";

/**
 * @example
 * ```ts
 * const graph = generateTrieGraph("taps" , "tap" , "top" , "tops");
 * 
 * console.dir(graph.getShortRootSummary() , {depth: 25});
 * ```
 */
const generateTrieGraph = (...words: [string, ...string[]]) => {
    const graph = new Graph();
    buildTrie(graph, words);
    return graph;
};

/**
 * Minimizes a `TRIE` graph which will result in a `DAWG`/`DAFSA` graph
 *
 * - This function mutates the given graph itself and does not return a new Graph
 *
 * @warn Be aware that this minimization method is not optimized
 *
 * @example
 * ```ts
 * const graph = generateTrieGraph("taps" , "tap" , "top" , "tops");
 *
 * minimizeTrieGraph(graph);
 *
 * console.dir(graph.getShortRootSummary() , {depth: 25});
 * ```
 */
const minimizeTrieGraph = (graph: Graph) => {
    minimizeTrie(graph);
    return graph;
};

/**
 * @example
 * ```ts
 * const graph = generateDawg("taps" , "tap" , "top" , "tops");
 * 
 * console.dir(graph.getShortRootSummary() , {depth: 25});
 * ```
 */
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
