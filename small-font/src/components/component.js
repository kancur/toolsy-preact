import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks'
import { toSmallCaps, toSuperScript } from '../fontSizeTransformations'
import { copyTextToClipboard } from '../copyToClipboard'
import { FaCopy } from "react-icons/fa";
import Shadow from '../preact-shadow-root'

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

function MyTextInput({ setText }) {
  return (
    <textarea
      data-gramm_editor="false"
      id="text-input"
      onInput={e => setText(e.target.value)}
      class="textarea"
      placeholder="e.g. Hello world"
    />
  )
}


function ResultBox(props) {
  const [copied, setCopied] = useState()
  const [flash, setFlash] = useState()

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
    whiteSpace: "pre-line",
  }

  return (
    <Fragment>
      <div class="box level is-relative" style={{fontFamily: "Arial, Helvetica, sans-serif"}}>
        <div class="mb-0">
          <h2 class="title is-3 has-text-danger">{props.heading}</h2>
          <p style={{ ...pstyle, backgroundColor: flash ? "#cce6ff" : "white" }} background class="is-size-4">
            {props.children}
          </p>
        </div>
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
    </Fragment>
  )
}


const CopyButton =
  <Fragment>
    <FaCopy />
    <span style={{ "marginLeft": "6px" }}>Copy to clipboard</span>
  </Fragment>