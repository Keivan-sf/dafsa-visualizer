const viz = new Viz();
const body = document.querySelector("body");
const trieEL = document.querySelector(".trie-graph > .g-container");
const dawgEL = document.querySelector(".dawg-graph > .g-container");
(async () => {
    buildGraphs(
        [
            "tap",
            "taps",
            "top",
            "tops",
            "awp",
            "connector",
            "connect",
            "teen",
            "tooth",
        ],
        trieEL,
        dawgEL
    );
    buildGraphs(
        [
            "cat",
            "cats",
            "car",
            "cars",
        ],
        trieEL,
        dawgEL
    );
    // const png = await svgToPng(svg);
    // console.log(png);
    // console.log(svg);
})();
