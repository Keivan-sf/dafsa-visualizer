import { wordNeededLetters } from "../../Types";
import { Graph } from "../../utils";

export const findPrefix = (
    word: string,
    NodeManager: Graph
): wordNeededLetters | undefined => {
    for (let i = word.length; i >= 0; i--) {
        const sliced = word.slice(0, i);

        for (const node of NodeManager.nodes) {
            if (node.evaluateParentWord() === sliced) {
                let passedNode = !node.isEndNode
                    ? node
                    : node.parentEdge[0].node;
                return { node: passedNode, neededLetters: word.slice(i) };
            }
        }
    }
};
