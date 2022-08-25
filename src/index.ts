import trie from "./lib";

const t = trie.generateTrieGraph("tops", "top", "tap", "taps");
const m2 = trie.generateDawg("tops", "top", "tap", "taps");
console.dir(
    t.getShortRootSummary(),
    {
        depth: 25,
    }
);

console.log(t.convertToVizGraph())