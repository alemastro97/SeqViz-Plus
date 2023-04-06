import * as React from "react";
import { Coor, Size } from "../elements";
import { GenArcFunc, ILabel } from "./Circular";
export interface GroupedLabelsWithCoors {
    forkCoor: null | Coor;
    grouped: boolean;
    labels: ILabel[];
    lineCoor: Coor;
    name: string;
    overflow: unknown;
    textAnchor: "start" | "end";
    textCoor: Coor;
}
interface LabelsProps {
    center: Coor;
    findCoor: (index: number, radius: number, rotate?: boolean) => Coor;
    genArc: GenArcFunc;
    getRotation: (index: number) => string;
    labels: ILabel[];
    lineHeight: number;
    radius: number;
    rotateCoor: (coor: Coor, degrees: number) => Coor;
    seqLength: number;
    size: Size;
    yDiff: number;
}
interface LabelsState {
    hoveredGroup: string;
    labelGroups: GroupedLabelsWithCoors[];
}
/**
 * used to build up all plasmid labels, for annotations, enzymes, etc
 *
 * a caveat to take into account here is that the names, outside the
 * map, might also overlap with one another. There will need to be a check, given
 * the dimensions of each name, calculated by the font, and the size
 * of the viewer, for scaling these names and positioning in the Y-direction
 * to avoid this overlap problem
 */
export declare class Labels extends React.Component<LabelsProps, LabelsState> {
    constructor(props: LabelsProps);
    static getDerivedStateFromProps: (nextProps: LabelsProps, prevState: LabelsState) => {
        hoveredGroup: string;
        labelGroups: {
            textCoor: {
                x: number;
                y: number;
            };
            forkCoor: Coor | null;
            grouped: boolean;
            labels: ILabel[];
            lineCoor: Coor;
            name: string;
            overflow: unknown;
            textAnchor: "start" | "end";
        }[];
    };
    /**
     * need to avoid having overlapping names. if names
     * overlap with one another, they should be grouped together and
     * just show the first name of the group. Ex: "M13-rev,GTP,+3"
     *
     * On hover over this group, all the other names should be shown
     *
     * this should return all the informaiton needed to render the
     * name by itself or in a grouping
     */
    static groupOverlappingLabels: (props: LabelsProps) => {
        textCoor: {
            x: number;
            y: number;
        };
        forkCoor: Coor | null;
        grouped: boolean;
        labels: ILabel[];
        lineCoor: Coor;
        name: string;
        overflow: unknown;
        textAnchor: "start" | "end";
    }[];
    setHoveredGroup: (hoveredGroup: string) => void;
    render(): JSX.Element;
}
export {};
