import { useState } from 'preact/hooks'
import { MyTextInput } from './MyTextInput';
import { addSymbolBetweenChars, convertText, encloseCharBetweenSymbols, encloseCharBetweenWords, encloseInSymbols, unicodeCombine } from '../unicodeConverter';
import { TABLES } from '../conversionData';
import { ResultBox } from './ResultBox';


export default function App() {
  const [text, setText] = useState("Facebook Username");

  if (!text) {
    setText("Facebook Username")
  }

  return (
    <div class="block" style={{ maxWidth: "800px" }}>
      <div class="box">
        <h2 class="title is-2 has-text-primary">Type your name:</h2>
        <MyTextInput setText={setText} />
      </div>

      {Object.keys(TABLES).map((key, index) =>
        <ResultBox ribbonProperties={TABLES[key].properties} key={index}>{convertText(text, TABLES[key])}</ResultBox>
      )}

      <ResultBox>{addSymbolBetweenChars(text, '𝅘')}</ResultBox> 
      <ResultBox>{addSymbolBetweenChars(convertText(text, TABLES['MONOSPACE']), '𝇅')}</ResultBox>
      <ResultBox>{addSymbolBetweenChars(convertText(text, TABLES['FRAKTUR']), '𐎂')}</ResultBox>
      <ResultBox>{addSymbolBetweenChars(text, '〰')}</ResultBox>
      <ResultBox>{addSymbolBetweenChars(text, '⭒')}</ResultBox>
      <ResultBox>{addSymbolBetweenChars(convertText(text, TABLES['BOLD_SCRIPT']), '⫶')}</ResultBox>
      <ResultBox>{encloseCharBetweenSymbols(convertText(text, TABLES['BOLD_SCRIPT']), '⟨' ,'⟩')}</ResultBox>
      <ResultBox>{addSymbolBetweenChars(text, '░')}</ResultBox>
      <ResultBox>{encloseCharBetweenWords(text, '⚞', '⚟')}</ResultBox>
      <ResultBox>{encloseCharBetweenWords(text, '⎛', '⎞')}</ResultBox>
      <ResultBox>{unicodeCombine(text, "\u0305\u0332\u0308")}</ResultBox>
      <ResultBox>{unicodeCombine(text, "\u034E\u0329\u0329\u0329")}</ResultBox>
      <ResultBox>{unicodeCombine(text, "\u033D")}</ResultBox>
      <ResultBox>{unicodeCombine(text, "\u0359\u0359\u0359\u0359\u0359\u0359\u0359")}</ResultBox>
      <ResultBox>{unicodeCombine(convertText(text, TABLES['MATHEMATICAL_SCRIPT']), '\u033C')}</ResultBox> 
      <ResultBox>{unicodeCombine(text, "\u0336")}</ResultBox>

    </div>
  );
}

