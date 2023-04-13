import * as React from "react";
import { complement, reverseComplement, translate } from "../sequence";
import { guessType } from "../sequence";

export default function FloatingMenu({ close, seq, start, end, top, left, seqComp = '' }) {
  const Dna = (e) => {
    e.preventDefault();
    copyOnClipboard(seq, start, end);
    close();
  };
  const DnaCompare = (e) => {
    e.preventDefault();
    copyOnClipboard(seqComp, start, end);
    close();
  };
  const ComplementDna = (e) => {
    e.preventDefault();
    const val = complement(seq, 'dna');
    copyOnClipboard(val.compSeq,  start, end);
    close();
  };
  const ReverseDna = (e) => {
    e.preventDefault();
    const val = reverseComplement(seq, 'dna');
    copyOnClipboard(val,  seq.length - end, seq.length - start);
    close();
  };
  const Translation = (e) => {
    e.preventDefault();
    const val  = translate(seq.substring(start || 0, end), 'dna');
    copyOnClipboard(val, 0, val.length);
    close();
  };

  const copyOnClipboard = (text: string, start:number, end:number) => {
    if (!document) return;
    const tempNode = document.createElement('textarea');
    tempNode.innerText = text.substring(start || 0, end);
    if (document.body) {
      document.body.appendChild(tempNode);
    }
    tempNode.select();
    document.execCommand('copy');
    tempNode.remove();
  };

  return (
    // TODO: change guess method to include - symbol
    <div className="la-fm-container" style={{ top: top - 50, left }}>
      {seqComp !== '' && 
      <>
      <button onClick={Dna}>Copy sequence one</button>
      <button onClick={DnaCompare}>Copy sequence two</button>
      </>}
      {seqComp === '' && guessType(seq) === 'aa' && <button onClick={Dna}>Copy protein sequence</button>}
      {seqComp === '' && guessType(seq) === 'dna' && <button onClick={Dna}>Copy DNA sequence</button>}
      {seqComp === '' && guessType(seq) === 'dna' && <button onClick={ComplementDna}>Copy complement</button>}
      {seqComp === '' && guessType(seq) === 'dna' && <button onClick={ReverseDna}>Copy reverse complement</button>}
      {seqComp === '' && guessType(seq) === 'dna' && <button onClick={Translation}>Copy translation</button>}
    </div>
  );
}