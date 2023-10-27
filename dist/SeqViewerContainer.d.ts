import * as React from "react";
import { Annotation, CutSite, Highlight, NameRange, Range, SeqType } from "./elements";
import { Selection } from "./selectionContext";
/**
 * This is the width in pixels of a character that's 12px
 * This will need to change whenever the css of the plasmid viewer text changes
 * just divide the width of some rectangular text by it's number of characters
 */
export declare const CHAR_WIDTH = 7.2;
interface SeqViewerContainerProps {
    annotations: Annotation[];
    bpColors: {
        [key: number | string]: string;
    };
    compSeq: string;
    copyEvent: (event: React.KeyboardEvent<HTMLElement>) => boolean;
    colorized: boolean;
    cutSites: CutSite[];
    height: number;
    highlights: Highlight[];
    name: string;
    nameToCompare?: string;
    aagrouping?: boolean;
    showDetails?: boolean;
    onSelection: (selection: Selection) => void;
    rotateOnScroll: boolean;
    search: NameRange[];
    selection?: {
        clockwise?: boolean;
        end: number;
        start: number;
    };
    seq: string;
    seqToCompare: string;
    seqType: SeqType;
    showComplement: boolean;
    showIndex: boolean;
    targetRef: React.LegacyRef<HTMLDivElement>;
    /** testSize is a forced height/width that overwrites anything from sizeMe. For testing */
    testSize?: {
        height: number;
        width: number;
    };
    translations: Range[];
    viewer: "linear" | "circular" | "both" | "both_flip" | "alignment";
    width: number;
    zoom: {
        circular: number;
        linear: number;
    };
}
export interface SeqViewerContainerState {
    centralIndex: {
        circular: number;
        linear: number;
        setCentralIndex: (type: "LINEAR" | "CIRCULAR", value: number) => void;
    };
    selection: Selection;
}
declare const _default: React.ForwardRefExoticComponent<Omit<Omit<Omit<SeqViewerContainerProps, "targetRef"> & {
    targetRef?: React.LegacyRef<HTMLDivElement> | undefined;
}, "width">, "height"> & React.RefAttributes<HTMLElement>>;
export default _default;
