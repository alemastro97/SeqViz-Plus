import * as React from "react";
import { InputRefFunc } from "../SelectionHandler";
import { Annotation, CutSite, Highlight, NameRange, Range, SeqType, Size } from "../elements";
export interface LinearProps {
    annotations: Annotation[];
    bpColors?: {
        [key: number | string]: string;
    };
    bpsPerBlock: number;
    charWidth: number;
    compSeq: string;
    cutSites: CutSite[];
    elementHeight: number;
    handleMouseEvent: React.MouseEventHandler;
    highlights: Highlight[];
    inputRef: InputRefFunc;
    lineHeight: number;
    onUnmount: (id: string) => void;
    search: NameRange[];
    seq: string;
    seqFontSize: number;
    seqType: SeqType;
    colorized: boolean;
    showComplement: boolean;
    showIndex: boolean;
    size: Size;
    translations: Range[];
    zoom: {
        linear: number;
    };
}
/**
 * A linear sequence viewer.
 *
 * Comprised of SeqBlock(s), which are themselves comprised of:
 * 	text (seq)
 * 	Index (axis)
 * 	Annotations
 *  Finds
 *  Translations
 *  Selections
 */
export default class Linear extends React.Component<LinearProps> {
    /**
     * Deep equality comparison
     */
    shouldComponentUpdate: (nextProps: LinearProps) => boolean;
    /**
     * given all the information needed to render all the seqblocks (ie, sequence, compSeq
     * list of annotations), cut up all that information into an array.
     * Each element in that array pertaining to one SeqBlock
     *
     * For example, if each seqblock has 2 bps, and the seq is "ATGCAG", this should first
     * make an array of ["AT", "GC", "AG"], and then pass "AT" to the first SeqBlock, "GC" to
     * the second seqBlock, and "AG" to the third seqBlock.
     */
    render(): 0 | JSX.Element;
}
