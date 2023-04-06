import { CutSite, Enzyme, SeqType } from "./elements";
/**
 * Digest a sequence with the enzymes and return an array of cut-site.
 *
 * This is slow enough to impact rendering so shouldn't be ran on each prop change.
 */
declare const _default: (seq: string, seqType: SeqType, enzymes?: (Enzyme | string)[], enzymesCustom?: {
    [key: string]: Enzyme;
}) => CutSite[];
export default _default;
/**
 * Search through the sequence with the enzyme and return an array of cut and hang indexes.
 *
 * Exported for testing.
 */
export declare const findCutSites: (enzyme: Enzyme, seq: string, seqType: SeqType, seqL: number) => CutSite[];
