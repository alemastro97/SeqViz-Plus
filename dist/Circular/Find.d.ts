import { InputRefFunc } from "../SelectionHandler";
import { HighlightProp, Range } from "../elements";
import { GenArcFunc } from "./Circular";
export declare const Find: (props: {
    genArc: GenArcFunc;
    getRotation: (index: number) => string;
    highlights: HighlightProp[];
    inputRef: InputRefFunc;
    lineHeight: number;
    radius: number;
    search: Range[];
    seqLength: number;
}) => JSX.Element;
