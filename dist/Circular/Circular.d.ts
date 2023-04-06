import * as React from "react";
import { InputRefFunc } from "../SelectionHandler";
import CentralIndexContext from "../centralIndexContext";
import { Annotation, Coor, CutSite, Highlight, Range, Size } from "../elements";
/** Sequence length cutoff below which the circular viewer's sequence won't be rendered. */
export declare const RENDER_SEQ_LENGTH_CUTOFF = 250;
export interface ILabel {
    end: number;
    id?: string;
    name: string;
    start: number;
    type: "enzyme" | "annotation";
}
/** GenArcFunc is a method that makes an arc on the viewer for a Circular child. */
export declare type GenArcFunc = (args: {
    arrowFWD?: boolean;
    arrowREV?: boolean;
    innerRadius: number;
    largeArc: boolean;
    length: number;
    offset?: number;
    outerRadius: number;
    sweepFWD?: boolean;
}) => string;
interface CircularProps {
    annotations: Annotation[];
    center: {
        x: number;
        y: number;
    };
    compSeq: string;
    cutSites: CutSite[];
    handleMouseEvent: (e: any) => void;
    highlights: Highlight[];
    inputRef: InputRefFunc;
    name: string;
    onUnmount: (id: string) => void;
    radius: number;
    rotateOnScroll: boolean;
    search: Range[];
    seq: string;
    showIndex: boolean;
    size: Size;
    yDiff: number;
}
interface CircularState {
    annotationsInRows: Annotation[][];
    inlinedLabels: string[];
    lineHeight: number;
    outerLabels: ILabel[];
    seqLength: number;
}
/** Circular is a circular viewer that contains a bunch of arcs. */
export default class Circular extends React.Component<CircularProps, CircularState> {
    static contextType: React.Context<{
        circular: number;
        linear: number;
        setCentralIndex: (_: "LINEAR" | "CIRCULAR", __: number) => void;
    }>;
    static context: React.ContextType<typeof CentralIndexContext>;
    context: React.ContextType<typeof CentralIndexContext>;
    constructor(props: CircularProps);
    static getDerivedStateFromProps: (nextProps: CircularProps) => CircularState;
    /**
     * Deep equality comparison
     */
    shouldComponentUpdate: (nextProps: CircularProps) => boolean;
    /**
     * Return the SVG rotation transformation needed to put a child element in the
     * correct location around the plasmid. This func makes use of the centralIndex field in parent state
     * to rotate the plasmid viewer.
     */
    getRotation: (index: number) => string;
    /**
     * Given an index along the plasmid and its radius, find the coordinate
     * will be used in many of the child components
     *
     * In general, this is for lines and labels
     */
    findCoor: (index: number, radius: number, rotate?: boolean) => Coor;
    /**
     * Given a coordinate, and the degrees to rotate it, find the new coordinate
     * (assuming that the rotation is around the center)
     *
     * in general this is for text and arcs
     */
    rotateCoor: (coor: Coor, degrees: number) => Coor;
    /**
     * Given an inner and outer radius, and the length of the element, return the
     * path for an arc that circles the plasmid. The optional paramters sweepFWD and sweepREV
     * are needed for selection arcs (where the direction of the arc isn't known beforehand)
     * and arrowFWD and arrowREV are needed for annotations, where there may be directionality
     */
    genArc: GenArcFunc;
    /**
     * handle a scroll event and, if it's a CIRCULAR viewer, update the
     * current central index
     */
    handleScrollEvent: (e: React.WheelEvent<SVGElement>) => void;
    render(): JSX.Element | null;
}
/**
 * Create an SVG arc around a single element in the Circular Viewer.
 */
export declare const Arc: (props: {
    className: string;
    color?: string | undefined;
    direction: -1 | 1;
    end: number;
    genArc: GenArcFunc;
    getRotation: (index: number) => string;
    inputRef: InputRefFunc;
    lineHeight: number;
    radius: number;
    seqLength: number;
    start: number;
}) => JSX.Element;
export {};
