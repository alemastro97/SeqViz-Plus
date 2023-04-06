import * as React from "react";
import SelectionContext from "../selectionContext";
import { FindXAndWidthType } from "./SeqBlock";
interface EdgesProps {
    findXAndWidth: FindXAndWidthType;
    firstBase: number;
    fullSeq: string;
    lastBase: number;
    selectEdgeHeight: number;
}
/**
 * Edges on the side of selections of the Selection Viewer
 *
 * Only shown at the selection's start and end, not intermediate blocks (if there are intermediate blocks)
 */
declare class Edges extends React.PureComponent<EdgesProps> {
    static contextType: React.Context<import("../selectionContext").Selection>;
    static context: React.ContextType<typeof SelectionContext>;
    context: React.ContextType<typeof SelectionContext>;
    id: string;
    render(): JSX.Element | null | undefined;
}
interface BlockProps {
    findXAndWidth: FindXAndWidthType;
    firstBase: number;
    fullSeq: string;
    lastBase: number;
    onUnmount: (a: string) => void;
    selectHeight: number;
}
/**
 * A Block is a single range of selected bases. Usually shown as a light blue box. Can span a single or multiple blocks.
 */
declare class Block extends React.PureComponent<BlockProps> {
    static contextType: React.Context<import("../selectionContext").Selection>;
    static context: React.ContextType<typeof SelectionContext>;
    context: React.ContextType<typeof SelectionContext>;
    id: string;
    render(): JSX.Element | null | undefined;
}
declare const _default: {
    Block: typeof Block;
    Edges: typeof Edges;
};
export default _default;
