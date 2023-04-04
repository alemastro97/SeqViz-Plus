import * as React from "react";
import { reverseComplement, translate } from "../sequence";
import { guessType } from "../sequence";

export default function FloatingMenu({ close, seq, start, end, top, left }) {
  const Dna = (e) => {
    e.preventDefault();
    copyOnClipboard(seq);
    close();
  };
  const ReverseDna = (e) => {
    e.preventDefault();
    const val = reverseComplement(seq, 'dna');
    copyOnClipboard(val);
    close();
  };
  const Translation = (e) => {
    e.preventDefault();
    const val  = translate(seq, 'dna');
    copyOnClipboard(val);
    close();
  };

  const copyOnClipboard = (text: string) => {
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
    <div className="la-fm-container" style={{ top: top - 50, left }}>
      {guessType(seq) === 'aa' && <button onClick={Dna}>Copy protein sequence</button>}
      {guessType(seq) === 'dna' && <button onClick={Dna}>Copy DNA sequence</button>}
      {guessType(seq) === 'dna' && <button onClick={ReverseDna}>Copy reverse complement</button>}
      {guessType(seq) === 'dna' && <button onClick={Translation}>Copy translation</button>}
    </div>
  );
}