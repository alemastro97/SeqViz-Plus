import * as React from "react";
declare type SelectionTypeEnum = "ANNOTATION" | "FIND" | "TRANSLATION" | "ENZYME" | "SEQ" | "AMINOACID" | "HIGHLIGHT" | "";
export interface Selection {
    clockwise?: boolean;
    color?: string;
    direction?: number;
    end?: number;
    id?: string;
    length?: number;
    name?: string;
    parent?: Selection;
    ref?: null | string;
    start?: number;
    type: SelectionTypeEnum;
    viewer?: "LINEAR" | "CIRCULAR";
}
/** Initial/default selection */
export declare const defaultSelection: Selection;
/** Default context object */
declare const SelectionContext: React.Context<Selection>;
export default SelectionContext;
