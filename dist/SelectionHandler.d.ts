import * as React from "react";
import SelectionContext, { Selection } from "./selectionContext";
interface RefSelection extends Selection {
    viewer: "LINEAR" | "CIRCULAR";
}
export declare type InputRefFunc = (id: string, ref: RefSelection) => any;
export declare type SeqVizMouseEvent = React.MouseEvent & {
    target: {
        id: string;
    };
};
export interface SelectionHandlerProps {
    bpsPerBlock: number;
    center: {
        x: number;
        y: number;
    };
    centralIndex: number;
    children: (inputRef: InputRefFunc, handleMouseEvent: (e: SeqVizMouseEvent) => void, onUnmount: (ref: string) => void) => React.ReactNode;
    seq: string;
    setCentralIndex: (viewer: "LINEAR" | "CIRCULAR", index: number) => void;
    setSelection: (selection: Selection) => void;
    yDiff: number;
}
/**
 * SelectionHandler handles sequence selection. Each click, drag, etc, is
 * noted and mapped to a sequence index.
 */
export default class SelectionHandler extends React.PureComponent<SelectionHandlerProps> {
    static displayName: string;
    static contextType: React.Context<Selection>;
    static context: React.ContextType<typeof SelectionContext>;
    context: React.ContextType<typeof SelectionContext>;
    /** Only state is the selection range */
    state: {
        clockwise?: boolean | undefined;
        color?: string | undefined;
        direction?: number | undefined;
        end?: number | undefined;
        id?: string | undefined;
        length?: number | undefined;
        name?: string | undefined;
        parent?: Selection | undefined;
        ref?: string | null | undefined;
        start?: number | undefined;
        type: "" | "ANNOTATION" | "FIND" | "TRANSLATION" | "ENZYME" | "SEQ" | "AMINOACID" | "HIGHLIGHT";
        viewer?: "LINEAR" | "CIRCULAR" | undefined;
    };
    previousBase: null | number;
    forward: null | boolean;
    fullSelectionLength: number;
    dragEvent: boolean;
    selectionStarted: boolean;
    shiftSelection: boolean;
    lastClick: number;
    /** a map between the id of child elements and their associated SelectRanges */
    idToRange: Map<string, Selection>;
    componentDidMount: () => void;
    componentWillUnmount: () => void;
    /** Stop the current drag event from happening */
    stopDrag: () => void;
    /**
     * Called at start of drag to make sure checkers are reset to default state
     */
    resetCircleDragVars: (start: null | number) => void;
    /**
     * a ref callback for mapping the id of child to its SelectRange
     * it stores the id of all elements
     **/
    inputRef: (ref: string, selectRange: Selection) => void;
    /**
     * remove the ref by ID.
     */
    removeMountedBlock: (ref: string) => void;
    /**
     * the selected child element is something that is known by reference.
     * update its SeqBlock's range (or any others affected) with the newly
     * active range
     */
    mouseEvent: (e: SeqVizMouseEvent) => void;
    /**
     * Handle a sequence selection on a linear viewer
     */
    handleLinearSeqEvent: (e: SeqVizMouseEvent, knownRange: {
        end: number;
        start: number;
    }) => void;
    /**
     * Handle a sequence selection event on the circular viewer
     */
    handleCircularSeqEvent: (e: SeqVizMouseEvent) => void;
    /**
     * in a linear sequence viewer, given the bounding box of a component, the basepairs
     * by SeqBlock and the position of the mouse event, find the current base
     */
    calculateBaseLinear: (e: SeqVizMouseEvent, knownRange: {
        end: number;
        start: number;
    }) => number;
    /**
     * in a circular plasmid viewer, given the center of the viewer, and position of the
     * mouse event, find the currently hovered or clicked basepair
     */
    calculateBaseCircular: (e: SeqVizMouseEvent) => number;
    /**
     * Update the selection in state. Only update the specified
     * properties of the selection that should be updated.
     */
    setSelection: (newSelection: Selection) => void;
    /**
     * Check what the length of the selection is in circle drag select
     */
    calcSelectionLength: (start: number, base: number, clock: boolean | null) => number;
    render(): React.ReactNode;
}
export {};
