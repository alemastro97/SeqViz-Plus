import { InputRefFunc } from "../SelectionHandler";
import { CutSite, Size } from "../elements";
import { FindXAndWidthType } from "./SeqBlock";
/**
 * Renders enzyme cut sites on the linear viewer. This includes a few things:
 * - the cut site itself (some lines for the cut site on top and bottom sequences)
 * - an outline of the total recognition site (can span SeqBlocks)
 * - a label above the cut-site
 */
export declare const CutSites: (props: {
    cutSites: CutSite[];
    findXAndWidth: FindXAndWidthType;
    firstBase: number;
    inputRef: InputRefFunc;
    lastBase: number;
    lineHeight: number;
    size: Size;
    yDiff: number;
    zoom: {
        linear: number;
    };
}) => JSX.Element | null;
