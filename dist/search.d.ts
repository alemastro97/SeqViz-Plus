import { NameRange, SeqType } from "./elements";
/**
 * Search the seq in the forward and reverse complement strands.
 * Return all matched regions. Accounts for abiguous BP encodings and allows for mismatches
 */
declare const _default: (query: string, mismatch: number | undefined, seq: string | undefined, seqType: SeqType) => NameRange[];
export default _default;
/**
 * Translate common symbols to their wildcards to build up a regex. The regex is case insensitive.
 *
 * Eg "N" matches [ATGCU]. So a query of "ANN" maps to "A(A|T|G|C|U)(A|T|G|C|U)"
 */
export declare const createRegex: (query: string, seqType: SeqType) => RegExp;
