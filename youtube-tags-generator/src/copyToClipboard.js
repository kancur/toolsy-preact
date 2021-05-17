import { useState } from 'preact/hooks'


export function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  textArea.style.width = '2em';
  textArea.style.height = '2em';

  textArea.style.padding = 0;

  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  textArea.style.background = 'transparent';

  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  var successful = document.execCommand('copy');

  document.body.removeChild(textArea);
}


export const CopyToClipboardButton = ({text}) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleClick = () => {
    copyTextToClipboard(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false),600)
  }

  return (
    <button style="width: 150px" onClick={handleClick} class="button is-link">{!isCopied ? "Copy to clipboard" : "COPIED"}</button>
  )
}