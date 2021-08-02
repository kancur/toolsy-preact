import { useState } from 'preact/hooks'
import { useMediaQuery } from 'react-responsive'
import { NotificationMessage } from './notificactionMessage/NotificationMessage'
import { Fragment } from 'preact';

export function InputForm({ setVcode }) {
  const [inputText, setInputText] = useState()
  const [errorMsg, setErrorMsg] = useState()
  const isSmall = useMediaQuery({
    query: '(max-device-width: 568px)'
  })


  function validate(input) {
    if (input.includes("youtube.com/watch") || input.includes("youtu.be/")) {
      return true
    }
    return false
  }

  function getVideoCode(urlstring) {
    const url = new URL(urlstring);
    let video = ""

    if (urlstring.includes("youtu.be/")) {
      video = (url.pathname).substring(1);
    } else {
      video = url.searchParams.get('v')
    }
    return (video)
  }

  const withHttps = url => !/^https?:\/\//i.test(url) ? `https://${url}` : url;

  const onSubmit = (e) => {
    e.preventDefault();

    if (inputText) {
      const url = withHttps(inputText);

      if (validate(url)) {
        setErrorMsg(null)
        /* handleSubmit(getVideoCode(inputText)) */
        setVcode(getVideoCode(url))
      } else {
        setErrorMsg("Please enter a valid youtube video URL")
        setVcode(null)
      }
    } else {
      setErrorMsg(null)
    }
  }

  return (
    <Fragment>
      <div class="box">
        <form onSubmit={onSubmit} class="block" >
          <div class="field has-addons">
            <div class="control is-expanded is-relative" style={{zIndex: 1}}>
              <input
                maxLength="300"
                class="input"
                type="text"
                placeholder="Paste a youtube video link"
                onInput={e => setInputText(e.target.value)}
              />

              <NotificationMessage show={!!errorMsg}>
                {errorMsg}
              </NotificationMessage>


            </div>
            {
              !isSmall &&
              <div class="control">
                <button type="submit" class="button is-primary">
                  Get thumbnails
            </button>
              </div>
            }
          </div>
          {
            isSmall &&
            <div class="control is-expanded">
              <button type="submit" class="button is-primary is-fullwidth">
                Get thumbnails
            </button>
            </div>
          }
        </form>

      </div>


    </Fragment>
  );
}

