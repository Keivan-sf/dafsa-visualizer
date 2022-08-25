import trie from "./lib";

const t = trie.generateTrieGraph("tops", "top", "tap", "taps");
const m = trie.minimizeTrieGraph(t);
const m2 = trie.generateDawg("tops", "top", "tap", "taps");
console.dir(
    m2.getShortRootSummary(),
    {
        depth: 25,
    }
);
