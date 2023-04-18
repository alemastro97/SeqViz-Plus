
export default function AlignmentStatistics({ seq, seqToCompare, seqType }) {
    const generateFunctionSymbol = () =>{
      const blossom_block = [
        ['c'],
        ['s','t','a','g','p'],
            ['d','e','q','n'],
            ['k','r','h'],
            ['m','i','l','v'],
            ['f','y','w']
          ];
        let seqSymbols = '';
        
        if (seqType === 'aa') {
          seqToCompare.split('').forEach((c, i) => seqSymbols += (blossom_block.find(block => block.includes(c.toLowerCase())) || []).includes(seq[i].toLowerCase()) ? (seq[i] === c )  ? '|': '.' : (seq[i] === '-'||c==='-' )?'-':'*');
        } else {
          seqToCompare.split('').forEach((c, i) => seqSymbols += [c ,seq[i]].includes('-') ? ' ' : c === seq[i] ? '|' : '.' );
        }
        console.log(seqSymbols)
        return `${seqSymbols}`
    }
    return (
            <div style={{ border: '1px solid grey', margin: '10px', borderRadius: '1rem'}}>
            <div style={{ margin: '10px', fontFamily:'sans-serif'}}><b>Seq1 Length (Length of seq without “-“)</b>:{seq.split("").filter(el => el !== '-').length}</div>
            <div style={{ margin: '10px', fontFamily:'sans-serif'}}><b>Seq2 Length (Length of seq without “-“)</b>:{seqToCompare.split("").filter(el => el !== '-').length}</div>
            <div style={{ margin: '10px', fontFamily:'sans-serif'}}><b>Number of mismatches (All non-gap position that are not “|” or “.”)</b>: { generateFunctionSymbol().split('').reduce((a,c) => {if(c==='*') return a+=1; return a},0)} </div>
            <div style={{ margin: '10px', fontFamily:'sans-serif'}}><b>Seq1 Fraction Identical(Number of non-gap (no “-“) identical (“|”) / Number of non-gap (no “-“))</b>: { (generateFunctionSymbol().split('').reduce((a,c) => {if(c==='|') return a+=1; return a},0)/seq.split("").filter(el => el !== '-').length).toFixed(2)}</div>
            <div style={{ margin: '10px', fontFamily:'sans-serif'}}><b>Seq2 Fraction Identical(Same as above, but for Seq2)</b>: { (generateFunctionSymbol().split('').reduce((a,c) => {if(c==='|') return a+=1; return a},0)/seqToCompare.split("").filter(el => el !== '-').length).toFixed(2)}</div>
            <div style={{ margin: '10px', fontFamily:'sans-serif'}}><b>Seq1 Coverage(Number of aligned positions (“|” or “.”) / Seq1 Length (without gaps))</b>: { (generateFunctionSymbol().split('').reduce((a,c) => {if(['|','.'].includes(c)) return a+=1; return a},0)/seq.split("").filter(el => el !== '-').length).toFixed(2)}</div>
            <div style={{ margin: '10px', fontFamily:'sans-serif'}}><b>Seq2 Coverage</b>: {( generateFunctionSymbol().split('').reduce((a,c) => {if(['|','.'].includes(c)) return a+=1; return a},0)/seqToCompare.split("").filter(el => el !== '-').length).toFixed(2)}</div>
</div>
    )
}
