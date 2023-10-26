import * as React from "react";
import { InputRefFunc } from "../SelectionHandler";
import { Annotation, CutSite, Highlight, NameRange, Range, SeqType, Size, Translation } from "../elements";
export declare type FindXAndWidthType = (n1?: number | null, n2?: number | null) => {
    width: number;
    x: number;
};
export declare type FindXAndWidthElementType = (i: number, element: NameRange, elements: NameRange[]) => {
    overflowLeft: boolean;
    overflowRight: boolean;
    width: number;
    x: number;
};
interface SeqBlockProps {
    annotationRows: Annotation[][];
    blockHeight: number;
    bpColors?: {
        [key: number | string]: string;
    };
    bpsPerBlock: number;
    charWidth: number;
    compSeq: string;
    symbolSeq: string;
    cutSiteRows: CutSite[];
    elementHeight: number;
    firstBase: number;
    fullSeq: string;
    handleMouseEvent: React.MouseEventHandler<SVGSVGElement>;
    highlights: Highlight[];
    id: string;
    viewer: string;
    inputRef: InputRefFunc;
    key: string;
    lineHeight: number;
    onUnmount: (a: string) => void;
    searchRows: Range[];
    seq: string;
    seqFontSize: number;
    seqType: SeqType;
    showComplement: boolean;
    showIndex: boolean;
    colorized: boolean;
    aagrouping?: boolean;
    size: Size;
    translations: Translation[];
    y: number;
    zoom: {
        linear: number;
    };
    zoomed: boolean;
}
/**
 * SeqBlock
 *
 * Comprised of:
 * 	   IndexRow (the x axis basepair index)
 * 	   AnnotationRows (annotations)
 * 	   Selection (cursor selection range)
 * 	   Find (regions that match the users current find search)
 *     CutSites (cut sites)
 *     Translations
 *
 * a single block of linear sequence. Essentially a row that holds
 * the sequence, and flair around it including the
 * complementary sequence, sequence index, and anotations *
 */
export declare class SeqBlock extends React.PureComponent<SeqBlockProps> {
    static defaultProps: {};
    componentWillUnmount: () => void;
    /**
     * For elements in arrays, check whether it wraps around the zero index.
     */
    findXAndWidthElement: (i: number, element: NameRange, elements: NameRange[]) => {
        overflowLeft: boolean;
        overflowRight: boolean;
        width: number;
        x: number;
    };
    /**
     * A helper used in child components to position elements on rows. Given first and last base, how far from the left
     * and how wide should it be?
     *
     * If an element and elements are provided, it also factors in whether the element circles around the 0-index.
     */
    findXAndWidth: (firstIndex?: number, lastIndex?: number) => {
        width: number;
        x: number;
    };
    /**
     * Given a bp, return either the bp as was or a text span if it should have a color.
     *
     * We're looking up each bp in the props.bpColors map to see if it should be shaded and, if so,
     * wrapping it in a textSpan with that color as a fill
     */
    seqTextSpan: (bp: string, i: number, textProps: any, indexYDiff: any, lineHeight: any) => JSX.Element;
    alignmentSeqTextSpan: (bp: string, i: number, textProps: any, indexYDiff: any, lineHeight: any) => JSX.Element;
    render(): JSX.Element | null;
}
export {};
