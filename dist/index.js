const viz = new Viz();
const body = document.querySelector("body");
const mainDiv = document.createElement("div");
mainDiv.id = "mainDiv";
body.appendChild(mainDiv);
const graph = Trie.generateTrieGraph("tap", "taps", "tup", "tups");
const graphInViz = graph.convertToVizGraph();

(async () => {
    const svg = await viz.renderSVGElement(graphInViz);
    styleGraph(svg, mainDiv);
    console.log(`svg outer`, svg.outerHTML);
    const png = await svgToPng(svg);
    console.log(png);
    console.log(svg);
})();
