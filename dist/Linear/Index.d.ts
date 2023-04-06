import * as React from "react";
import { SeqType, Size } from "../elements";
import { FindXAndWidthType } from "./SeqBlock";
interface IndexProps {
    charWidth: number;
    findXAndWidth: FindXAndWidthType;
    firstBase: number;
    lastBase: number;
    seq: string;
    seqType: SeqType;
    showIndex: boolean;
    size: Size;
    yDiff: number;
    zoom: {
        linear: number;
    };
}
/**
 * Index is a row with numbers showing the indexes of base pairs in the sequence.
 */
export default class Index extends React.PureComponent<IndexProps> {
    genTicks: () => JSX.Element[];
    render(): JSX.Element | null;
}
export {};
