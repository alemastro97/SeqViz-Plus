import * as React from "react";
import CentralIndexContext from "../centralIndexContext";
import { Coor, Size } from "../elements";
import { GenArcFunc } from "./Circular";
interface IndexProps {
    center: Coor;
    compSeq: string;
    findCoor: (index: number, radius: number, rotate?: boolean) => Coor;
    genArc: GenArcFunc;
    getRotation: (index: number) => string;
    lineHeight: number;
    name: string;
    radius: number;
    rotateCoor: (coor: Coor, degrees: number) => Coor;
    seq: string;
    seqLength: number;
    showIndex: boolean;
    size: Size;
    totalRows: number;
    yDiff: number;
}
/**
 * The Index component renders the plasmid's:
 * 		1. name (center or bottom)
 * 		2. number of bps (center or bottom)
 * 		3. index circle
 * 		4. index ticks and numbers along the plasmid circle
 *
 * The center or bottom here refers to the fact that the name/bps of the
 * part need to be pushed to the bottom of the circular viewer if there
 * are too many elements in the circular viewer and the name won't fit
 */
export declare class Index extends React.PureComponent<IndexProps> {
    static contextType: React.Context<{
        circular: number;
        linear: number;
        setCentralIndex: (_: "LINEAR" | "CIRCULAR", __: number) => void;
    }>;
    static context: React.ContextType<typeof CentralIndexContext>;
    context: React.ContextType<typeof CentralIndexContext>;
    static getDerivedStateFromProps: (nextProps: IndexProps) => {
        indexInc: number;
        ticks: number[];
    };
    state: {
        indexInc: number;
        ticks: never[];
    };
    /**
     * return a react element for the basepairs along the surface of the plasmid viewer
     */
    renderBasepairs: () => JSX.Element[];
    render(): JSX.Element | null;
}
export {};
