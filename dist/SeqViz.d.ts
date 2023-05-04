import * as React from "react";
import { Annotation, AnnotationProp, CutSite, Enzyme, HighlightProp, NameRange, Range, SeqType } from "./elements";
import search from "./search";
import { Selection } from "./selectionContext";
/** `SeqViz` props. See the README for more details. One of `seq`, `file` or `accession` is required. */
export interface SeqVizProps {
    /**
     * an NCBI or iGEM accession to retrieve a sequence using
     *
     * @deprecated use `...seqparse.parse(accession)` to fetch and parse the accession to SeqViz props
     */
    accession?: string;
    /** a list of annotations to render to the viewer */
    annotations?: AnnotationProp[];
    /**
     * an iGEM backbone to render within the viewer
     *
     * @deprecated append `backbone` to `props.seq`
     */
    backbone?: string;
    /** nucleotides keyed by symbol or index and the color to apply to it */
    bpColors?: {
        [key: number | string]: string;
    };
    /** a list of colors to populate un-colored annotations with. HEX, RGB, names are supported */
    colors?: string[];
    /** the complementary sequence to `seq`. Inferred by default. Ignored if `seqType: "aa"` */
    compSeq?: string;
    /** a callback that is applied within SeqViz on each keyboard event. If it returns truthy, the currently selected seq is copied */
    copyEvent?: (event: React.KeyboardEvent<HTMLElement>) => boolean;
    /** a list of enzymes or enzyme names to digest the sequence with. see seqviz.Enzymes */
    enzymes?: (Enzyme | string)[];
    /**
     * a map from enzyme name to definition for custom enzymes not already supported
     *
     * @deprecated use `enzymes` for custom enzymes
     */
    enzymesCustom?: {
        [key: string]: Enzyme;
    };
    /**
     * a file to parse and render. Genbank, FASTA, SnapGene, JBEI, SBOLv1/2, ab1, and SeqBuilder formats are supported
     *
     * @deprecated use `...seqparse.parse(file)` outside of SeqViz to parse a file to SeqViz props
     */
    file?: string | File;
    /**
     * ranges of the viewer to highlight.
     *
     * @deprecated use `highlights`
     */
    highlightedRegions?: HighlightProp[];
    /** ranges of sequence to highlight on the viewer */
    highlights?: HighlightProp[];
    /** the name of the sequence to show in the middle of the circular viewer */
    name?: string;
    /** a callback that's executed on each change to the search parameters or sequence */
    onSearch?: (search: Range[]) => void;
    /** a callback that's executed on each click of the sequence viewer. Selection includes meta about the selected element */
    onSelection?: (selection: Selection) => void;
    /** whether the circular viewer should rotate when the mouse scrolls over the plasmid */
    rotateOnScroll?: boolean;
    /** search parameters. Matched sequences on the viewer are highlighted and selectable. */
    search?: {
        mismatch?: number;
        query: string;
    };
    /**
     * Externally managed selection.
     *
     * If passed, SeqViz uses this prop as the selection range, rather than the internally managed selection */
    selection?: {
        clockwise?: boolean;
        end: number;
        start: number;
    };
    /** a sequence to render. Can be DNA, RNA, or an amino acid sequence. Setting accession or file overrides this */
    seq?: string;
    seqToCompare: string;
    colorized: boolean;
    /** the type of the sequence. If this isn't passed, the type is guessed */
    seqType?: "dna" | "rna" | "aa";
    /**
     * whether to render the annotation rows
     *
     * @deprecated to avoid rendering annotations, don't pass any
     */
    showAnnotations?: boolean;
    /** whether to render the complement sequence */
    showComplement?: boolean;
    /** whether to show the index row with ticks and indexes  */
    showIndex?: boolean;
    /** extra style props to apply to the outermost div of SeqViz */
    style?: Record<string, unknown>;
    /** ranges of sequence that should have amino acid translations shown */
    translations?: {
        direction?: number;
        end: number;
        start: number;
    }[];
    /** the orientation of the viewer(s). "both", the default, has a circular viewer on left and a linear viewer on right. */
    viewer?: "linear" | "circular" | "both" | "both_flip" | "alignment";
    /** how large to make the sequence and elements [0,100]. A larger zoom increases the size of text and elements for that viewer. */
    zoom?: {
        /**
         * how zoomed to make the circular viewer. default: 0
         *
         * @deprecated make a Github issue if this is a desired feature
         */
        circular?: number;
        /** how zoomed to make the linear viewer. default: 50 */
        linear?: number;
    };
}
export interface SeqVizState {
    annotations: Annotation[];
    compSeq: string;
    cutSites: CutSite[];
    name: string;
    search: NameRange[];
    seq: string;
    seqType: SeqType;
}
/**
 * SeqViz is a viewer for rendering sequences in a linear and/or circular viewer.
 */
export default class SeqViz extends React.Component<SeqVizProps, SeqVizState> {
    static defaultProps: SeqVizProps;
    constructor(props: SeqVizProps);
    /**
     * If an accession was provided, query it here.
     */
    componentDidMount(): void;
    /** Log caught errors. */
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    /**
     * Re-parse props to state if there are changes to:
     * - seq/accession/file (this probably means we need to update the rest)
     * - search input changes
     * - enzymes change
     * - annotations
     *
     * This is needed for the parse(accession) call that makes an async fetch to a remote repository
     * https://reactjs.org/docs/react-component.html#componentdidupdate
     */
    componentDidUpdate: ({ accession, annotations, enzymes, enzymesCustom, file, search }: SeqVizProps, { seq, seqType }: SeqVizState) => void;
    /**
     * If a file is provided or a sequence is provided, parse it and its annotations.
     * If an accession is provided, query a remote repository and parse the sequence and annotations.
     */
    parseInput: (props?: SeqVizProps) => {
        annotations: Annotation[];
        compSeq: string;
        name: string;
        seq: string;
        seqType: SeqType;
    };
    /**
     * Search for the query sequence in the part sequence, set in state.
     */
    search: (props: SeqVizProps, seq: string) => {
        search: NameRange[];
    };
    /**
     * Find and save enzymes' cut-site locations.
     */
    cut: (seq: string, seqType: SeqType) => {
        cutSites: CutSite[];
    };
    /**
     * Fix annotations to add unique ids, fix directionality, and modulo the start and end of each.
     */
    parseAnnotations: (annotations?: AnnotationProp[] | null, seq?: string) => Annotation[];
    render(): JSX.Element;
}
