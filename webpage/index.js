const viz = new Viz();
const body = document.querySelector("body");
const trieEL = document.querySelector(".trie-graph > .g-container");
const dawgEL = document.querySelector(".dawg-graph > .g-container");
/**
 * @type {HTMLInputElement}
 */
const userInput = document.querySelector(".inputContainer input[type=text]");
const buildBtn = document.querySelector(".build-btn>div");
(async () => {
    buildGraphs(["cat", "cats", "car", "cars"], trieEL, dawgEL);
})();

buildBtn.onclick = () => {
    const words = userInput.value.split(",").map(w => w.trim()).filter(w => w);
    buildGraphs(words, trieEL, dawgEL);
}