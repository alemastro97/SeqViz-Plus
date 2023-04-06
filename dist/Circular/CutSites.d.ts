import { InputRefFunc } from "../SelectionHandler";
import { Coor, CutSite } from "../elements";
import { GenArcFunc } from "./Circular";
interface CutSitesProps {
    center: Coor;
    cutSites: CutSite[];
    findCoor: (index: number, radius: number, rotate?: boolean) => Coor;
    genArc: GenArcFunc;
    getRotation: (index: number) => string;
    inputRef: InputRefFunc;
    lineHeight: number;
    radius: number;
    rotateCoor: (coor: Coor, degrees: number) => Coor;
    selectionRows: number;
    seqLength: number;
}
export declare const CutSites: (props: CutSitesProps) => JSX.Element | null;
export {};
