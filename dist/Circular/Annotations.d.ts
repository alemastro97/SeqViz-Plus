import * as React from "react";
import { InputRefFunc } from "../SelectionHandler";
import { Annotation } from "../elements";
import { GenArcFunc } from "./Circular";
interface AnnotationsProps {
    annotations: Annotation[][];
    genArc: GenArcFunc;
    getRotation: (index: number) => string;
    inlinedAnnotations: string[];
    inputRef: InputRefFunc;
    lineHeight: number;
    radius: number;
    rowsToSkip: number;
    seqLength: number;
}
/**
 * Used to build up all the path elements. Does not include a display
 * of the annotation name or a line connecting name to annotation
 *
 * Annotations might overlap with one another. To avoid that, annotations are first moved into rows -- non-overlapping
 * arrays or annotation arrays -- and then used to create the array of array of annotation paths.
 */
export declare class Annotations extends React.PureComponent<AnnotationsProps> {
    /** during an annotation hover event, darken all other pieces of the same annotation */
    hoverAnnotation: (className: string, opacity: string) => void;
    render(): JSX.Element;
}
export {};
