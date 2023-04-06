import { InputRefFunc } from "../SelectionHandler";
import { NameRange } from "../elements";
import { FindXAndWidthElementType } from "./SeqBlock";
/**
 * Render each row of annotations into its own row.
 * This is not a default export for sake of the React component displayName.
 */
declare const AnnotationRows: (props: {
    annotationRows: NameRange[][];
    bpsPerBlock: number;
    elementHeight: number;
    findXAndWidth: FindXAndWidthElementType;
    firstBase: number;
    fullSeq: string;
    inputRef: InputRefFunc;
    lastBase: number;
    seqBlockRef: unknown;
    width: number;
    yDiff: number;
}) => JSX.Element;
export default AnnotationRows;
