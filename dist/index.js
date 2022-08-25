const viz = new Viz();
const body = document.querySelector("body");
const mainDiv = document.createElement("div");
mainDiv.id = "mainDiv";
body.appendChild(mainDiv);
const graph = Trie.generateTrieGraph("tap", "taps", "tup", "tups");
const graphInViz = graph.convertToVizGraph();
(async () => {
    const svg = await viz.renderSVGElement(graphInViz);
    styleGraph(svg);
    console.log(svg);
})();

const styleGraph = (svg) => {
    svg.querySelectorAll("polygon + text").forEach((e) => {
        if (e.innerHTML == "EOW") return e.setAttribute("font-size", "10pt");
        e.setAttribute("font-size", "18pt");
        const x = +e.getAttribute("x");
        e.setAttribute("x", x + 1);
    });
    svg.querySelectorAll("ellipse + text").forEach((n) => (n.innerHTML = " "));
    mainDiv.style.width = svg.getAttribute("width");
    mainDiv.appendChild(svg);
};
