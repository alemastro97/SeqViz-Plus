import { Range, SeqType } from "./elements";
/**
 * Map of nucleotide bases
 */
export declare const nucleotides: {
    a: string;
    c: string;
    g: string;
    t: string;
    u: string;
};
/** Given a seq type, return the associated symbol alphabet */
export declare const getAlphabet: (seqType: SeqType) => {
    b: {
        d: string;
        n: string;
    };
    j: {
        i: string;
        l: string;
    };
    x: {};
    z: {
        e: string;
        q: string;
    };
} | {
    b: {
        c: string;
        g: string;
        t: string;
    };
    d: {
        a: string;
        g: string;
        t: string;
    };
    h: {
        a: string;
        c: string;
        t: string;
    };
    k: {
        g: string;
        t: string;
    };
    m: {
        a: string;
        c: string;
    };
    n: {
        a: string;
        c: string;
        g: string;
        t: string;
    };
    r: {
        a: string;
        g: string;
    };
    s: {
        c: string;
        g: string;
    };
    v: {
        a: string;
        c: string;
        g: string;
    };
    w: {
        a: string;
        t: string;
    };
    x: {
        a: string;
        c: string;
        g: string;
        t: string;
    };
    y: {
        c: string;
        t: string;
    };
} | {
    b: {
        c: string;
        g: string;
        u: string;
    };
    d: {
        a: string;
        g: string;
        u: string;
    };
    h: {
        a: string;
        c: string;
        u: string;
    };
    k: {
        g: string;
        u: string;
    };
    m: {
        a: string;
        c: string;
    };
    n: {
        a: string;
        c: string;
        g: string;
        u: string;
    };
    r: {
        a: string;
        g: string;
    };
    s: {
        c: string;
        g: string;
    };
    v: {
        a: string;
        c: string;
        g: string;
    };
    w: {
        a: string;
        u: string;
    };
    x: {
        a: string;
        c: string;
        g: string;
        u: string;
    };
    y: {
        c: string;
        u: string;
    };
};
/**
 * Infer the type of a sequence. This is *without* any ambiguous symbols, so maybe wrong by being overly strict.
 */
export declare const guessType: (seq: string) => SeqType;
/**
 * Reverses a string sequence
 */
export declare const reverse: (seq: string) => string;
/**
 * Return the filtered sequence and its complement if its an empty string, return the same for both.
 */
export declare const complement: (origSeq: string, seqType: SeqType) => {
    compSeq: string;
    seq: string;
};
/**
 * Return the reverse complement of a DNA sequence
 */
export declare const reverseComplement: (inputSeq: string, seqType: SeqType) => string;
/**
 * Parse the user defined direction, estimate the direction of the element
 *
 * ```js
 * directionality("FWD") => 1
 * directionality("FORWARD") => 1
 * ```
 */
export declare const directionality: (direction: number | string | undefined) => -1 | 0 | 1;
/**
 * Given a sequence, translate it into an Amino Acid sequence
 */
export declare const translate: (seqInput: string, seqType: SeqType) => string;
/**
 * for each translation (range + direction) and the input sequence, convert it to a translation and amino acid sequence
 */
export declare const createTranslations: (translations: Range[], seq: string, seqType: SeqType) => {
    AAseq: string;
    end: number;
    start: number;
    direction: 0 | 1 | -1;
    id: string;
    name: string;
}[];
/**
 * Create a random 10 digit string ID
 *
 * Lazily copied from StackOverflow: https://stackoverflow.com/a/57355127
 */
export declare const randomID: (n?: number) => string;
