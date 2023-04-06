import { InputRefFunc } from "../SelectionHandler";
import { NameRange } from "../elements";
import { FindXAndWidthElementType } from "./SeqBlock";
/**
 * Render rectangles aroun highlighted ranges.
 */
declare const Highlights: (props: {
    compYDiff: number;
    findXAndWidth: FindXAndWidthElementType;
    firstBase: number;
    highlights: NameRange[];
    indexYDiff: number;
    inputRef: InputRefFunc;
    lastBase: number;
    lineHeight: number;
    listenerOnly: boolean;
    seqBlockRef: unknown;
}) => JSX.Element;
export default Highlights;
