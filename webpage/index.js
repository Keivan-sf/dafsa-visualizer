const viz = new Viz();
const body = document.querySelector("body");
const trieEL = document.querySelector(".trie-graph > .g-container");
const dawgEL = document.querySelector(".dawg-graph > .g-container");
(async () => {

    const t = await showTrieGraph(["tap", "taps", "top", "tops" , "awp" , "connector" , "connect" , "teen" , "tooth"], trieEL);
    console.log(t);
    await showDawgGraph(t.graph, dawgEL);

    // const png = await svgToPng(svg);
    // console.log(png);
    // console.log(svg);
})();
