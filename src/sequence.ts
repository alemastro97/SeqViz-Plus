import { Range, SeqType } from "./elements";

/**
 * Map of nucleotide bases
 */
export const nucleotides = { a: "a", c: "c", g: "g", t: "t", u: "u" };

const blossum62 = {
  '*':{'*':  1, 'A': -4, 'C': -4, 'B': -4, 'E': -4,
        'D': -4, 'G': -4, 'F': -4, 'I': -4, 'H': -4,
        'K': -4, 'M': -4, 'L': -4, 'N': -4, 'Q': -4,
        'P': -4, 'S': -4, 'R': -4, 'T': -4, 'W': -4,
        'V': -4, 'Y': -4, 'X': -4, 'Z': -4},

   'A':{'*': -4, 'A':  4, 'C':  0, 'B': -2, 'E': -1,
        'D': -2, 'G':  0, 'F': -2, 'I': -1, 'H': -2,
        'K': -1, 'M': -1, 'L': -1, 'N': -2, 'Q': -1,
        'P': -1, 'S':  1, 'R': -1, 'T':  0, 'W': -3,
        'V':  0, 'Y': -2, 'X':  0, 'Z': -1},

   'C':{'*': -4, 'A':  0, 'C':  9, 'B': -3, 'E': -4,
        'D': -3, 'G': -3, 'F': -2, 'I': -1, 'H': -3,
        'K': -3, 'M': -1, 'L': -1, 'N': -3, 'Q': -3,
        'P': -3, 'S': -1, 'R': -3, 'T': -1, 'W': -2,
        'V': -1, 'Y': -2, 'X': -2, 'Z': -3},

   'B':{'*': -4, 'A': -2, 'C': -3, 'B':  4, 'E':  1,
        'D':  4, 'G': -1, 'F': -3, 'I': -3, 'H':  0,
        'K':  0, 'M': -3, 'L': -4, 'N':  3, 'Q':  0,
        'P': -2, 'S':  0, 'R': -1, 'T': -1, 'W': -4,
        'V': -3, 'Y': -3, 'X': -1, 'Z':  1},

   'E':{'*': -4, 'A': -1, 'C': -4, 'B':  1, 'E':  5,
        'D':  2, 'G': -2, 'F': -3, 'I': -3, 'H':  0,
        'K':  1, 'M': -2, 'L': -3, 'N':  0, 'Q':  2,
        'P': -1, 'S':  0, 'R':  0, 'T': -1, 'W': -3,
        'V': -2, 'Y': -2, 'X': -1, 'Z':  4},

   'D':{'*': -4, 'A': -2, 'C': -3, 'B':  4, 'E':  2,
        'D':  6, 'G': -1, 'F': -3, 'I': -3, 'H': -1,
        'K': -1, 'M': -3, 'L': -4, 'N':  1, 'Q':  0,
        'P': -1, 'S':  0, 'R': -2, 'T': -1, 'W': -4,
        'V': -3, 'Y': -3, 'X': -1, 'Z':  1},

   'G':{'*': -4, 'A':  0, 'C': -3, 'B': -1, 'E': -2,
        'D': -1, 'G':  6, 'F': -3, 'I': -4, 'H': -2,
        'K': -2, 'M': -3, 'L': -4, 'N':  0, 'Q': -2,
        'P': -2, 'S':  0, 'R': -2, 'T': -2, 'W': -2,
        'V': -3, 'Y': -3, 'X': -1, 'Z': -2},

   'F':{'*': -4, 'A': -2, 'C': -2, 'B': -3, 'E': -3,
        'D': -3, 'G': -3, 'F':  6, 'I':  0, 'H': -1,
        'K': -3, 'M':  0, 'L':  0, 'N': -3, 'Q': -3,
        'P': -4, 'S': -2, 'R': -3, 'T': -2, 'W':  1,
        'V': -1, 'Y':  3, 'X': -1, 'Z': -3},

   'I':{'*': -4, 'A': -1, 'C': -1, 'B': -3, 'E': -3,
        'D': -3, 'G': -4, 'F':  0, 'I':  4, 'H': -3,
        'K': -3, 'M':  1, 'L':  2, 'N': -3, 'Q': -3,
        'P': -3, 'S': -2, 'R': -3, 'T': -1, 'W': -3,
        'V':  3, 'Y': -1, 'X': -1, 'Z': -3},

   'H':{'*': -4, 'A': -2, 'C': -3, 'B':  0, 'E':  0,
        'D': -1, 'G': -2, 'F': -1, 'I': -3, 'H':  8,
        'K': -1, 'M': -2, 'L': -3, 'N':  1, 'Q':  0,
        'P': -2, 'S': -1, 'R':  0, 'T': -2, 'W': -2,
        'V': -3, 'Y':  2, 'X': -1, 'Z':  0},

   'K':{'*': -4, 'A': -1, 'C': -3, 'B':  0, 'E':  1,
        'D': -1, 'G': -2, 'F': -3, 'I': -3, 'H': -1,
        'K':  5, 'M': -1, 'L': -2, 'N':  0, 'Q':  1,
        'P': -1, 'S':  0, 'R':  2, 'T': -1, 'W': -3,
        'V': -2, 'Y': -2, 'X': -1, 'Z':  1},

   'M':{'*': -4, 'A': -1, 'C': -1, 'B': -3, 'E': -2,
        'D': -3, 'G': -3, 'F':  0, 'I':  1, 'H': -2,
        'K': -1, 'M':  5, 'L':  2, 'N': -2, 'Q':  0,
        'P': -2, 'S': -1, 'R': -1, 'T': -1, 'W': -1,
        'V':  1, 'Y': -1, 'X': -1, 'Z': -1},

   'L':{'*': -4, 'A': -1, 'C': -1, 'B': -4, 'E': -3,
        'D': -4, 'G': -4, 'F':  0, 'I':  2, 'H': -3,
        'K': -2, 'M':  2, 'L':  4, 'N': -3, 'Q': -2,
        'P': -3, 'S': -2, 'R': -2, 'T': -1, 'W': -2,
        'V':  1, 'Y': -1, 'X': -1, 'Z': -3},

   'N':{'*': -4, 'A': -2, 'C': -3, 'B':  3, 'E':  0,
        'D':  1, 'G':  0, 'F': -3, 'I': -3, 'H':  1,
        'K':  0, 'M': -2, 'L': -3, 'N':  6, 'Q':  0,
        'P': -2, 'S':  1, 'R':  0, 'T':  0, 'W': -4,
        'V': -3, 'Y': -2, 'X': -1, 'Z':  0},

   'Q':{'*': -4, 'A': -1, 'C': -3, 'B':  0, 'E':  2,
        'D':  0, 'G': -2, 'F': -3, 'I': -3, 'H':  0,
        'K':  1, 'M':  0, 'L': -2, 'N':  0, 'Q':  5,
        'P': -1, 'S':  0, 'R':  1, 'T': -1, 'W': -2,
        'V': -2, 'Y': -1, 'X': -1, 'Z':  3},

   'P':{'*': -4, 'A': -1, 'C': -3, 'B': -2, 'E': -1,
        'D': -1, 'G': -2, 'F': -4, 'I': -3, 'H': -2,
        'K': -1, 'M': -2, 'L': -3, 'N': -2, 'Q': -1,
        'P':  7, 'S': -1, 'R': -2, 'T': -1, 'W': -4,
        'V': -2, 'Y': -3, 'X': -2, 'Z': -1},

   'S':{'*': -4, 'A':  1, 'C': -1, 'B':  0, 'E':  0,
        'D':  0, 'G':  0, 'F': -2, 'I': -2, 'H': -1,
        'K':  0, 'M': -1, 'L': -2, 'N':  1, 'Q':  0,
        'P': -1, 'S':  4, 'R': -1, 'T':  1, 'W': -3,
        'V': -2, 'Y': -2, 'X':  0, 'Z':  0},

   'R':{'*': -4, 'A': -1, 'C': -3, 'B': -1, 'E':  0,
        'D': -2, 'G': -2, 'F': -3, 'I': -3, 'H':  0,
        'K':  2, 'M': -1, 'L': -2, 'N':  0, 'Q':  1,
        'P': -2, 'S': -1, 'R':  5, 'T': -1, 'W': -3,
        'V': -3, 'Y': -2, 'X': -1, 'Z':  0},

   'T':{'*': -4, 'A':  0, 'C': -1, 'B': -1, 'E': -1,
        'D': -1, 'G': -2, 'F': -2, 'I': -1, 'H': -2,
        'K': -1, 'M': -1, 'L': -1, 'N':  0, 'Q': -1,
        'P': -1, 'S':  1, 'R': -1, 'T':  5, 'W': -2,
        'V':  0, 'Y': -2, 'X':  0, 'Z': -1},

   'W':{'*': -4, 'A': -3, 'C': -2, 'B': -4, 'E': -3,
        'D': -4, 'G': -2, 'F':  1, 'I': -3, 'H': -2,
        'K': -3, 'M': -1, 'L': -2, 'N': -4, 'Q': -2,
        'P': -4, 'S': -3, 'R': -3, 'T': -2, 'W': 11,
        'V': -3, 'Y':  2, 'X': -2, 'Z': -3},

   'V':{'*': -4, 'A':  0, 'C': -1, 'B': -3, 'E': -2,
        'D': -3, 'G': -3, 'F': -1, 'I':  3, 'H': -3,
        'K': -2, 'M':  1, 'L':  1, 'N': -3, 'Q': -2,
        'P': -2, 'S': -2, 'R': -3, 'T':  0, 'W': -3,
        'V':  4, 'Y': -1, 'X': -1, 'Z': -2},

   'Y':{'*': -4, 'A': -2, 'C': -2, 'B': -3, 'E': -2,
        'D': -3, 'G': -3, 'F':  3, 'I': -1, 'H':  2,
        'K': -2, 'M': -1, 'L': -1, 'N': -2, 'Q': -1,
        'P': -3, 'S': -2, 'R': -2, 'T': -2, 'W':  2,
        'V': -1, 'Y':  7, 'X': -1, 'Z': -2},

   'X':{'*': -4, 'A':  0, 'C': -2, 'B': -1, 'E': -1,
        'D': -1, 'G': -1, 'F': -1, 'I': -1, 'H': -1,
        'K': -1, 'M': -1, 'L': -1, 'N': -1, 'Q': -1,
        'P': -2, 'S':  0, 'R': -1, 'T':  0, 'W': -2,
        'V': -1, 'Y': -1, 'X': -1, 'Z': -1},

   'Z':{'*': -4, 'A': -1, 'C': -3, 'B':  1, 'E':  4,
        'D':  1, 'G': -2, 'F': -3, 'I': -3, 'H':  0,
        'K':  1, 'M': -1, 'L': -3, 'N':  0, 'Q':  3,
        'P': -1, 'S':  0, 'R':  0, 'T': -1, 'W': -3,
        'V': -2, 'Y': -2, 'X': -1, 'Z': 4}}
/**
 * Map of DNA basepairs to all the bases encoded by that character in the DNA alphabet.
 *
 * https://meme-suite.org/meme/doc/alphabets.html
 */
const dnaAlphabet = {
  // ".": { a: "a", c: "c", g: "g", t: "t" },
  b: { c: "c", g: "g", t: "t" },
  d: { a: "a", g: "g", t: "t" },
  h: { a: "a", c: "c", t: "t" },
  k: { g: "g", t: "t" },
  m: { a: "a", c: "c" },
  n: { a: "a", c: "c", g: "g", t: "t" },
  r: { a: "a", g: "g" },
  s: { c: "c", g: "g" },
  v: { a: "a", c: "c", g: "g" },
  w: { a: "a", t: "t" },
  x: { a: "a", c: "c", g: "g", t: "t" },
  y: { c: "c", t: "t" },
};

/**
 * Map of RNA basepairs to all the bases encoded by that character in the RNA alphabet.
 *
 * https://meme-suite.org/meme/doc/alphabets.html
 */
const rnaAlphabet = {
  // ".": { c: "c", g: "g", u: "u" },
  b: { c: "c", g: "g", u: "u" },
  d: { a: "a", g: "g", u: "u" },
  h: { a: "a", c: "c", u: "u" },
  k: { g: "g", u: "u" },
  m: { a: "a", c: "c" },
  n: { a: "a", c: "c", g: "g", u: "u" },
  r: { a: "a", g: "g" },
  s: { c: "c", g: "g" },
  v: { a: "a", c: "c", g: "g" },
  w: { a: "a", u: "u" },
  x: { a: "a", c: "c", g: "g", u: "u" },
  y: { c: "c", u: "u" },
};

/**
 * mapping the 64 standard codons to amino acids
 *
 * adapted from: "https://github.com/keithwhor/NtSeq/blob/master/lib/nt.js
 */
const dnaCodonToAminoAcid = {
  AAA: "K",
  AAC: "N",
  AAG: "K",
  AAT: "N",
  ACA: "T",
  ACC: "T",
  ACG: "T",
  ACT: "T",
  AGA: "R",
  AGC: "S",
  AGG: "R",
  AGT: "S",
  ATA: "I",
  ATC: "I",
  ATG: "M",
  ATT: "I",
  CAA: "Q",
  CAC: "H",
  CAG: "Q",
  CAT: "H",
  CCA: "P",
  CCC: "P",
  CCG: "P",
  CCT: "P",
  CGA: "R",
  CGC: "R",
  CGG: "R",
  CGT: "R",
  CTA: "L",
  CTC: "L",
  CTG: "L",
  CTT: "L",
  GAA: "E",
  GAC: "D",
  GAG: "E",
  GAT: "D",
  GCA: "A",
  GCC: "A",
  GCG: "A",
  GCT: "A",
  GGA: "G",
  GGC: "G",
  GGG: "G",
  GGT: "G",
  GTA: "V",
  GTC: "V",
  GTG: "V",
  GTT: "V",
  TAA: "*",
  TAC: "Y",
  TAG: "*",
  TAT: "Y",
  TCA: "S",
  TCC: "S",
  TCG: "S",
  TCT: "S",
  TGA: "*",
  TGC: "C",
  TGG: "W",
  TGT: "C",
  TTA: "L",
  TTC: "F",
  TTG: "L",
  TTT: "F",
};

const aminoAcids = Array.from(new Set(Object.values(dnaCodonToAminoAcid)).values()).join("");
const aminoAcidsMap = aminoAcids
  .toLowerCase()
  .split("")
  .filter(aa => aa !== "*") // TODO
  .reduce((acc, aa) => ({ ...acc, [aa]: aa }), {});

/**
 * Map of amino acids alphabet characters to what each matches.
 *
 * https://meme-suite.org/meme/doc/alphabets.html
 */
const aaAlphabet = {
  b: { d: "d", n: "n" },
  j: { i: "i", l: "l" },
  x: aminoAcidsMap,
  z: { e: "e", q: "q" },
};

/** Given a seq type, return the associated symbol alphabet */
export const getAlphabet = (seqType: SeqType) => {
  return {
    aa: aaAlphabet,
    dna: dnaAlphabet,
    rna: rnaAlphabet,
    unknown: dnaAlphabet,
  }[seqType];
};

const aminoAcidRegex = new RegExp(`^[${aminoAcids}BJXZ,-]+$`, "i");

/**
 * Infer the type of a sequence. This is *without* any ambiguous symbols, so maybe wrong by being overly strict.
 */
export const guessType = (seq: string): SeqType => {
  seq = seq.substring(0, 1000);
  if (/^[atgcn,-.]+$/i.test(seq)) {
    return "dna";
  } else if (/^[augcn,-.]+$/i.test(seq)) {
    return "rna";
  } else if (aminoAcidRegex.test(seq)) {
    return "aa";
  }
  return "unknown";
};

/**
 * Reverses a string sequence
 */
export const reverse = (seq: string): string => seq.split("").reverse().join("");

// from http://arep.med.harvard.edu/labgc/adnan/projects/Utilities/revcomp.html
let dnaComp = {
  "|" : "|",
  "." : ".",
  "-" : "-",
  a: "t",
  b: "v",
  c: "g",
  d: "h",
  g: "c",
  h: "d",
  k: "m",
  m: "k",
  n: "n",
  r: "y",
  s: "s",
  t: "a",
  u: "a",
  v: "b",
  w: "w",
  x: "x",
  y: "r",
};
dnaComp = {
  ...dnaComp,
  ...Object.keys(dnaComp).reduce((acc, k) => ({ ...acc, [k.toUpperCase()]: dnaComp[k].toUpperCase() }), {}),
};

/**
 * A map from each basepair to its complement
 */
const typeToCompMap = {
  aa: Object.keys(aminoAcidsMap).reduce((acc, k) => ({ ...acc, [k.toUpperCase()]: "", [k.toLowerCase()]: "" }), {
    B: "",
    J: "",
    Z: "",
    b: "",
    j: "",
    z: "",
  }),
  dna: dnaComp,
  rna: { ...dnaComp, A: "U", a: "u" },
  unknown: dnaComp,
  undefined: dnaComp
};

/**
 * Return the filtered sequence and its complement if its an empty string, return the same for both.
 */
export const complement = (origSeq: string, seqType: SeqType): { compSeq: string; seq: string } => {
  if (!origSeq) {
    return { compSeq: "", seq: "" };
  }
  const compMap = typeToCompMap[seqType];
  // filter out unrecognized base pairs and build up the complement
  let seq = "";
  let compSeq = "";
  for (let i = 0, origLength = origSeq.length; i < origLength; i += 1) {
    if (origSeq[i] in compMap) {

      seq += origSeq[i];
      compSeq += compMap[origSeq[i]];
    }
  }
  return { compSeq, seq };
};

/**
 * Return the reverse complement of a DNA sequence
 */
export const reverseComplement = (inputSeq: string, seqType: SeqType): string => {
  const { compSeq } = complement(inputSeq, seqType);
  console.log(compSeq.split("").reverse().join(""))
  return compSeq.split("").reverse().join("");
};

const fwd = new Set(["FWD", "fwd", "FORWARD", "forward", "FOR", "for", "TOP", "top", "1", 1]);
const rev = new Set(["REV", "rev", "REVERSE", "reverse", "BOTTOM", "bottom", "-1", -1]);

/**
 * Parse the user defined direction, estimate the direction of the element
 *
 * ```js
 * directionality("FWD") => 1
 * directionality("FORWARD") => 1
 * ```
 */
export const directionality = (direction: number | string | undefined): -1 | 0 | 1 => {
  if (!direction) {
    return 0;
  }
  if (fwd.has(direction)) {
    return 1;
  }
  if (rev.has(direction)) {
    return -1;
  }
  return 0;
};

const rnaCodonToAminoAcid = Object.keys(dnaCodonToAminoAcid).reduce(
  (acc, k) => ({ ...acc, [k.replace(/T/gi, "U")]: dnaCodonToAminoAcid[k] }),
  {}
);

/**
 * Given a sequence, translate it into an Amino Acid sequence
 */
export const translate = (seqInput: string, seqType: SeqType): string => {
  if (seqType === "aa") {
    return seqInput;
  }

  let codonMap: { [key: string]: string } = dnaCodonToAminoAcid;
  if (seqType === "rna") {
    codonMap = rnaCodonToAminoAcid;
  }

  const seq = seqInput.toUpperCase();
  const seqLength = seq.length;
  let aaSeq = "";
  for (let i = 0; i < seqLength; i += 3) {
    if (i + 2 < seqLength) {
      console.log(seq[i] + seq[i + 1] + seq[i + 2]);
      aaSeq += codonMap[seq[i] + seq[i + 1] + seq[i + 2]] || "?";
    }
  }
  return aaSeq;
};

/**
 * for each translation (range + direction) and the input sequence, convert it to a translation and amino acid sequence
 */
export const createTranslations = (translations: Range[], seq: string, seqType: SeqType) => {
  // elongate the original sequence to account for translations that cross the zero index
  const seqDoubled = seq + seq;
  const bpPerBlock = seqType === "aa" ? 1 : 3;

  return translations.map(t => {
    const { direction, start } = t;
    let { end } = t;
    if (start > end) end += seq.length;

    // TODO: below will fail on an "aa" type sequence if direction = -1. At the time of writing, this won't be reached, anyway

    // get the subsequence
    const subSeq =
      direction === 1 ? seqDoubled.substring(start, end) : reverseComplement(seqDoubled.substring(start, end), seqType);

    // translate the subsequence
    const aaSeq =
      direction === 1 ? translate(subSeq, seqType) : translate(subSeq, seqType).split("").reverse().join(""); // translate

    // the starting point for the translation, reading left to right (regardless of translation
    // direction). this is later needed to calculate the number of bps needed in the first
    // and last codons
    const tStart = direction === 1 ? start : end - aaSeq.length * bpPerBlock;
    let tEnd = direction === 1 ? (start + aaSeq.length * bpPerBlock) % seq.length : end % seq.length;

    // treating one particular edge case where the start at zero doesn't make sense
    if (tEnd === 0) {
      tEnd += seq.length;
    }

    return {
      id: randomID(),
      name: "translation",
      ...t,
      AAseq: aaSeq,
      end: tEnd,
      start: tStart,
    };
  });
};

/**
 * Create a random 10 digit string ID
 *
 * Lazily copied from StackOverflow: https://stackoverflow.com/a/57355127
 */
export const randomID = (n = 10) => {
  const add = 1;
  let max = 12 - add;
  max = Math.pow(10, n + add);
  const min = max / 10; // Math.pow(10, n) basically
  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  return String(number).substring(add);
};
