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
import { memo } from 'preact/compat';


export default function App() {
  const [text, setText] = useState("copy and paste fonts");

  if (!text) {
    setText("copy and paste fonts")
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
      <ResultBox ribbonProperties={{label:"♡♡♡", color:"#E81224"}}>{encloseCharBetweenWords(text, '❤️', '❤️')}</ResultBox>
      <ResultBox>{unicodeCombine(text, "\u0305\u0332\u0308")}</ResultBox>
      <ResultBox>{unicodeCombine(text, "\u034E\u0329\u0329\u0329")}</ResultBox>
      <ResultBox>{unicodeCombine(text, "\u033D")}</ResultBox>
      <ResultBox>{unicodeCombine(text, "\u0359\u0359\u0359\u0359\u0359\u0359\u0359")}</ResultBox>
      <ResultBox>{unicodeCombine(convertText(text, TABLES['MATHEMATICAL_SCRIPT']), '\u033C')}</ResultBox> 
      <ResultBox>{unicodeCombine(text, "\u0336")}</ResultBox>
      <ResultBox>{encloseInSymbols(text, "ᐅᐅᐅ ", " ᐊᐊᐊ")}</ResultBox>

    </div>
  );
}

function ResultBox({ribbonProperties, ...props}) {
  const [bind, { height }] = useMeasure()
  const [copied, setCopied] = useState(false)
  const [flash, setFlash] = useState(false)
  const heightprops = useSpring({ height: (height == 0) ? 84 : height })
  
  const isMobile = useMediaQuery({
    query: '(max-device-width: 768px)'
  })

  const getChildren = () => {
    return(props.children)
  }

  const copyToClipboard = () => {
    copyTextToClipboard("hovno")
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

  return (
    <div style="padding: 0" class="box is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center is-relative">
      
      {ribbonProperties && <RibbonTopLeft color={ribbonProperties.color}>{ribbonProperties.label}</RibbonTopLeft>}
      
      <animated.div style={{ overflow: 'hidden', ...heightprops }}>

        <div ref={bind} class="is-relative" style={{ fontFamily: "auto", height: "auto" }}>
          <div class="mb-0" style="padding: 1.25rem">
            <p style={{ ...pstyle, backgroundColor: (flash ? "#cce6ff" : "white") }} background class="mr-3 ml-4">
              {props.children}
            </p>
          </div>
        </div>

      </animated.div>

      <div class="level">
        <MemoedCopyButton copied={copied} copyToClipboard={copyToClipboard} isMobile={isMobile} />
      </div>
    </div>
  )
}


const CopyButtonX = ({copied, copyToClipboard, isMobile}) => {
  
  const copyButtonStyles = {
    minWidth: isMobile ? 80 : 170,
    cursor: "pointer",
    marginRight: "1.25rem"
  }

  return <button
    style={copyButtonStyles}
    disabled={copied}
    onClick={() => copyToClipboard()}
    class="button is-link p-2" >
    {copied ? "Copied" : <CopyWithIcon>{isMobile ? "Copy" : "Copy to clipboard"}</CopyWithIcon>}
  </button>;
}

const MemoedCopyButton = memo(CopyButtonX, (prevProps, nextProps) => {
  // Only re-render when `copied' changes
  return prevProps.copied === nextProps.copied && prevProps.isMobile === nextProps.isMobile;
})