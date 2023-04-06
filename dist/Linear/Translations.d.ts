import { InputRefFunc } from '../SelectionHandler';
import { SeqType, Translation } from '../elements';
import { FindXAndWidthType } from './SeqBlock';
interface TranslationRowsProps {
    bpsPerBlock: number;
    charWidth: number;
    elementHeight: number;
    findXAndWidth: FindXAndWidthType;
    firstBase: number;
    fullSeq: string;
    inputRef: InputRefFunc;
    lastBase: number;
    onUnmount: (a: unknown) => void;
    seqType: SeqType;
    translations: Translation[];
    yDiff: number;
}
/** Rows of translations */
export declare const TranslationRows: ({ bpsPerBlock, charWidth, elementHeight, findXAndWidth, firstBase, fullSeq, inputRef, lastBase, onUnmount, seqType, translations, yDiff }: TranslationRowsProps) => JSX.Element;
export {};
