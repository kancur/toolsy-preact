import { useState } from 'preact/hooks'
import { useMediaQuery } from 'react-responsive'
import useMeasure from 'react-use-measure';
import { useSpring, animated } from 'react-spring';


export function InputForm({ handleSubmit, setVcode }) {
  const [inputText, setInputText] = useState()
  const [errorMsg, setErrorMsg] = useState()
  const [bind, { height }] = useMeasure()
  const heightprops = useSpring({ height: (height == 0) ? 0 : height })
  const isSmall = useMediaQuery({
    query: '(max-device-width: 568px)'
  })


  function validate(input) {
    if (input.includes("youtube.com/watch")) {
      return true
    } else {
      return false
    }
  }

  function getVideoCode(urlstring) {
    const url = new URL(urlstring);
    const video = url.searchParams.get('v')
    return (video)
  }

  const withHttps = url => !/^https?:\/\//i.test(url) ? `https://${url}` : url;

  const onSubmit = (e) => {
    e.preventDefault();
    const url = withHttps(inputText);

    if (validate(url)) {
      setErrorMsg(null)
      /* handleSubmit(getVideoCode(inputText)) */
      setVcode(getVideoCode(url))
    } else {
      setErrorMsg("Please enter a valid youtube video URL")
      setVcode(null)
    }
  }

  return (
    <animated.div class="box p-0" style={{ overflow: 'hidden', ...heightprops }}>
      <div ref={bind} class="p-5">
        <form onSubmit={onSubmit} class="block" >
          <div class="field has-addons">
            <div class="control is-expanded">
              <input
                maxLength="300"
                class="input"
                type="text"
                placeholder="Paste a youtube video link"
                onInput={e => setInputText(e.target.value)}
              />
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

        {errorMsg &&
          <div class="block">
            <div class="notification is-danger">
              {errorMsg}
            </div>
          </div>
        }

      </div>
    </animated.div>
  );
}

