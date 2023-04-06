import { Enzyme } from "./elements";
/**
 * NEB Restriction Enzymes
 *
 * a list of enzyme objects with their name as the key,
 * their recognition site sequence as "rseq", and cut site relative to the
 * start of the recognition site as "fcut", and the start of the resulting overhang
 * from the recognition site as "rcut"
 *
 * eg: PstI with recognition site "CTGCAG" cuts so that the break is at (cutSite = 5):
 *
 * ```
 * 		..C TGCA|G..
 * 		..G|ACGT C..
 *
 * ```
 *
 * and the resulting fragment looks like (rcut = 1):
 *
 * ```
 * 		..CTGCA
 * 		..G****
 * ```
 */
declare const enzymes: {
    [key: string]: Enzyme;
};
export default enzymes;
