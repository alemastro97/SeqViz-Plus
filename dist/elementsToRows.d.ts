import { NameRange } from "./elements";
/**
 * Take an array of elements and create a 2D array where non-overlapping elements are in
 * the same row. Example:
 *
 * input (`T[]`):
 * ```
 * 		[ ---Ann---	---Ann3---
 * 			 ---Ann2--- ]
 * ```
 *
 * output (`T[][]`):
 * ```
 * 		[ ---Ann--- ---Ann3---]
 * 		[		---Ann2---    ]
 * ```
 */
export declare const stackElements: <T extends NameRange>(elements: T[], seqL: number) => T[][];
/**
 * given an array of arrays of an element, fragment the element into seq blocks
 *
 * this is needed in the Linear sequence viewer because it's easier to send only the
 * relevant elements to the child SeqBlocks, rather to send every SeqBlock everything
 * and have the block figure out whether element is included within it
 *
 * NOTE: if an element has a start and end index that are the same, it's assumed to
 * cover the entire plasmid
 */
export declare const createMultiRows: <T extends NameRange>(elements: T[][], rowLength: number, rowCount: number) => T[][][];
/**
 * Given an array of elements and an interval (`rowLength`), bin elements into rows.
 *
 * This is used by the Linear viewer for CutSites and Highlights where it's okay for
 * elements to overlap one another.
 */
export declare const createSingleRows: <T extends NameRange>(elements: T[], rowLength: number, rowCount: number, duplicateIdsAllowed?: boolean) => T[][];
