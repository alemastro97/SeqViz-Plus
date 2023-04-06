import * as React from "react";
import { Coor } from "../elements";
import SelectionContext from "../selectionContext";
import { GenArcFunc } from "./Circular";
interface CircularSelectionProps {
    findCoor: (index: number, radius: number, rotate?: boolean) => Coor;
    genArc: GenArcFunc;
    getRotation: (index: number) => string;
    lineHeight: number;
    radius: number;
    seq: string;
    seqLength: number;
    totalRows: number;
}
/**
 * renders the selection range of the plasmid viewer
 * consists of three parts (during an active selection):
 * 		left sidebar, right sidebar and the middle selection region
 *
 * if nothing is selected, it should just be the single cursor
 * without a middle highlighted region
 */
export declare class Selection extends React.PureComponent<CircularSelectionProps> {
    static contextType: React.Context<import("../selectionContext").Selection>;
    static context: React.ContextType<typeof SelectionContext>;
    context: React.ContextType<typeof SelectionContext>;
    render(): JSX.Element | undefined;
}
export {};
