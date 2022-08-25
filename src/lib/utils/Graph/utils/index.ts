import { Graph } from "../";
let id = 0;
export const generateID = () => ++id;

export const convertGraphToVizGraph = (graph: Graph) => {
    const root = graph.nodes[0];
    let stack = [
        ...root.edges.map((e) => ({ from: root, char: e.char, to: e.node })),
    ];
    let edgesInViz: string[] = [];
    edgesInViz.push("digraph {");
    while (stack[0]) {
        const edge = stack[0];
        edgesInViz.push(
            `${edge.from.id} -> ${edge.to.id} [label="${edge.char}" fontsize="${
                edge.to.isEndNode ? 15 : 30
            }pt"];`
        );
        stack.shift();
        if (edge.to.isEndNode) continue;
        stack.push(
            ...edge.to.edges.map((e) => ({
                from: edge.to,
                char: e.char,
                to: e.node,
            }))
        );
    }
    edgesInViz.push("}");
    edgesInViz = Array.from(new Set(edgesInViz));
    return edgesInViz.join("\n");
};
