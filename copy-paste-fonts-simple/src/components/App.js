import { useState } from 'preact/hooks'
import { copyTextToClipboard } from '../copyToClipboard'
import { useSpring, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import { MyTextInput } from './MyTextInput';
import { CopyWithIcon } from './CopyButton';
import { addSymbolBetweenChars, convertText, encloseCharBetweenSymbols, encloseCharBetweenWords, encloseInSymbols, unicodeCombine } from '../unicodeConverter';
import { TABLES } from '../conversionData';
import { RibbonTopLeft } from './RibbonTopLeft';
import { useMediaQuery } from 'react-responsive'


export default function App() {
  const [text, setText] = useState("copy and paste fonts");

  if (!text) {
    setText("Copy and paste fonts")
  }

  return (
    <div class="block" style={{ maxWidth: "800px" }}>
      <div class="box">
        <h2 class="title is-2 has-text-primary">Type or paste any text:</h2>
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
      <ResultBox>{encloseCharBetweenWords(text, '▗', '▖')}</ResultBox>
      <ResultBox>{encloseCharBetweenWords(text, '⎛', '⎞')}</ResultBox>
      <ResultBox>{encloseCharBetweenWords(text, '∴', '∴')}</ResultBox>
      <ResultBox ribbonProperties={{label:"♥♥♥", color:"#E81224"}}>{encloseCharBetweenWords(text, '❤️', '❤️')}</ResultBox>
      <ResultBox>{unicodeCombine(text, "\u0305\u0332\u0308")}</ResultBox>
      <ResultBox>{unicodeCombine(text, "\u034E\u0329\u0329\u0329")}</ResultBox>
      <ResultBox>{unicodeCombine(convertText(text, TABLES['MATHEMATICAL_SCRIPT']), '\u033C')}</ResultBox> 
      <ResultBox>{unicodeCombine(text, "\u0336")}</ResultBox>
      <ResultBox>{encloseInSymbols(text, "ᐅᐅᐅ ", " ᐊᐊᐊ")}</ResultBox>

    </div>
  );
}

function ResultBox({ribbonProperties, ...props}) {
  const [copied, setCopied] = useState()
  const [flash, setFlash] = useState()
  const [bind, { height, width }] = useMeasure()
  const heightprops = useSpring({ height: (height == 0) ? 36 : height })
  const isMobile = useMediaQuery({
    query: '(max-device-width: 768px)'
  })
  const isTiny = useMediaQuery({
    query: '(max-device-width: 468px)'
  })

  const copyClipboard = (text) => {
    copyTextToClipboard(text)
    setCopied(true)
    setFlash(true)
    setTimeout(() => { setCopied(false) }, 500);
    setTimeout(() => { setFlash(false) }, 200);
  }

  const pstyle = {
    overflowWrap: "anywhere",
    transition: "background-color 200ms cubic-bezier(0.22, 0.61, 0.36, 1)",
    whiteSpace: "break-spaces",
    lineHeight: 1.4,
    padding: "8px",
    fontSize: "20px",
  }

  const copyButtonStyles = {
    minWidth: isMobile ? 80 : 250,
    cursor: "pointer"
  }

  return (
    <div class="box is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center is-relative">
      
      {ribbonProperties && <RibbonTopLeft color={ribbonProperties.color}>{ribbonProperties.label}</RibbonTopLeft>}
      
      <animated.div style={{ overflow: 'hidden', ...heightprops }}>

        <div ref={bind} class="is-relative" style={{ fontFamily: "auto", height: "auto" }}>
          <div class="mb-0">
            <p style={{ ...pstyle, backgroundColor: (flash ? "#cce6ff" : "white") }} background class="mr-3 ml-4">
              {props.children}
            </p>
          </div>
        </div>

      </animated.div>

      <div class="level">
        <button
          style={copyButtonStyles}
          disabled={copied}
          onClick={() => copyClipboard(props.children)}
          class="button is-link p-2" id={props.heading}>
          {copied ? "Copied" : <CopyWithIcon>{isMobile ? "Copy" : "Copy to clipboard"}</CopyWithIcon>}
        </button>
      </div>
    </div>
  )
}


