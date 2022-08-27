const viz = new Viz();
const body = document.querySelector("body");
const trieEL = document.querySelector(".trie-graph .g-container");
const dawgEL = document.querySelector(".dawg-graph .g-container");
const trieTitle = document.querySelector(".trie-graph .title");
const dawgTitle = document.querySelector(".dawg-graph .title");
/**
 * @type {HTMLInputElement}
 */
const userInput = document.querySelector(".inputContainer input[type=text]");
const buildBtn = document.querySelector(".build-btn>button");
(async () => {
    buildGraphs(["cat", "cats", "car", "cars"], {
        trieEL,
        dawgEL,
        trieTitle,
        dawgTitle,
    });
})();

buildBtn.onclick = async() => {
    const words = userInput.value
        .split(",")
        .map((w) => w.trim())
        .filter((w) => w);
    await buildGraphs(words, { trieEL, dawgEL, trieTitle, dawgTitle });
    trieTitle.scrollIntoView()
};

userInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") buildBtn.onclick();
});
