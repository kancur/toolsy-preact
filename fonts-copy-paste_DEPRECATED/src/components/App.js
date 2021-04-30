import { useState } from 'preact/hooks'
import { copyTextToClipboard } from '../copyToClipboard'
import { useSpring, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import { MyTextInput } from './MyTextInput';
import { CopyButton } from './CopyButton';
import { convertText } from '../unicodeConverter';
import { TABLES } from '../conversionData';

export default function App() {
  const [text, setText] = useState("Copy and paste fonts");

  if (!text){
    setText("Copy and paste fonts")
  }

  return (
    <div class="block" style={{ maxWidth: "800px" }}>
      <div class="box">
        <h2 class="title is-2 has-text-primary">Type or paste any text:</h2>
        <MyTextInput setText={setText} />
      </div>

      {TABLES.map((dataTable, index) => 
          <ResultBox isFavorite={dataTable.isFavorite} key={index}>{convertText(text, dataTable)}</ResultBox>
      )}

    </div>
  );
}

function ResultBox(props) {
  const [copied, setCopied] = useState()
  const [flash, setFlash] = useState()
  const [bind, { height }] = useMeasure()
  const heightprops = useSpring({ height: (height == 0) ? 36 : height })

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

  return (
    <div class="box is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center	">

      <animated.div style={{ overflow: 'hidden', ...heightprops }}>

        <div ref={bind} class="is-relative" style={{ fontFamily: "auto", height: "auto" }}>
          <RibbonTopLeft />
          <div class="mb-0">
            <p style={{ ...pstyle, backgroundColor: flash ? "#cce6ff" : "white" }} background class="mr-3">
              { props.children }
            </p>
          </div>
        </div>

      </animated.div>

      <div class="level"> 
        <button
          style="min-width: 166px; cursor: pointer;"
          disabled={copied}
          onClick={() => copyClipboard(props.children)}
          class="button is-link p-2" id={props.heading}>
          {copied ? "Copied" : CopyButton}
        </button>
      </div>
    </div>
  )
}

const RibbonTopLeft = () => <div style={RIBBONSTYLE}>I'm a fucking ribbon</div>

const RIBBONSTYLE = {
  width: "150px",
	height: "150px",
	overflow: "hidden",
	position: "absolute",
}