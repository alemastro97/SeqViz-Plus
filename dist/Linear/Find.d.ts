import { InputRefFunc } from "../SelectionHandler";
import { Range } from "../elements";
import { FindXAndWidthType } from "./SeqBlock";
/**
 * Render rectangles around Search results.
 */
declare const Find: ({ compYDiff, filteredRows: searchRows, findXAndWidth, firstBase, indexYDiff, inputRef, lastBase, lineHeight, listenerOnly, zoomed, }: {
    compYDiff: number;
    filteredRows: Range[];
    findXAndWidth: FindXAndWidthType;
    firstBase: number;
    indexYDiff: number;
    inputRef: InputRefFunc;
    lastBase: number;
    lineHeight: number;
    listenerOnly: boolean;
    zoomed: boolean;
}) => JSX.Element;
export default Find;
