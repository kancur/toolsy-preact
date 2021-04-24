import { useState } from 'preact/hooks'
import { toSmallCaps, toSuperScript } from '../fontSizeTransformations'
import { copyTextToClipboard } from '../copyToClipboard'
import { useSpring, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import { MyTextInput } from './MyTextInput';
import { CopyButton } from './CopyButton';

export default function App(props) {
  const [text, setText] = useState("");

  return (
    <div class="block" style={{ maxWidth: "800px" }}>
      <div class="box">
        <h2 class="title is-2 has-text-primary">Enter any text:</h2>
        <MyTextInput setText={setText} />
      </div>
      <ResultBox heading="Superscript">
        {toSuperScript(text)}
      </ResultBox>
      <ResultBox heading="Small Caps">
        {toSmallCaps(text)}
      </ResultBox>

    </div>
  );
}

function ResultBox(props) {
  const [copied, setCopied] = useState()
  const [flash, setFlash] = useState()
  const [bind, { height }] = useMeasure()
  const heightprops = useSpring({ height: (height == 0) ? 36 : height })

  console.log(height)

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
    lineHeight: 1,
  }

  return (
    <div class="box is-flex is-flex-direction-row is-justify-content-space-between">
      <animated.div style={{ overflow: 'hidden', ...heightprops }}>

        <div ref={bind} class="is-relative" style={{ fontFamily: "auto", height: "auto" }}>
          <div class="mb-0">
            <h2 class="title is-3 has-text-danger">{props.heading}</h2>
            <p style={{ ...pstyle, backgroundColor: flash ? "#cce6ff" : "white" }} background class="is-size-4 mr-3">
              {props.children}
            </p>
          </div>
        </div>

      </animated.div>

      <div class="level" id={"copyid-" + props.heading}>
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

