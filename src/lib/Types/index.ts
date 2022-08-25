import { GraphNode } from "../utils";

export type edgeNode = { char: string; node: GraphNode };

export type results = { numberOfNodes: number; words: string[] };

export type deleteEdgeOption = {
    /**
     * If **true**, it will call {@link GraphNode.removeParentEdge removeParentEdge} and
     * {@link GraphNode.removeChildEdge removeChildEdge} on both nodes and delete the
     * edge bidirectionally
     */
    bidirectional?: boolean;
};

export type wordNeededLetters = {
    /**
     * Start node of remaining letters
     */
    node: GraphNode;
    /**
     * Remaining letters to be generated in the graph for the word to be completed
     */
    neededLetters: string;
};
