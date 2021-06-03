import { useState } from 'preact/hooks'
import { useMediaQuery } from 'react-responsive'

export function InputForm({ handleSubmit, setVcode }) {
  const [inputText, setInputText] = useState()
  const isSmall = useMediaQuery({
    query: '(max-device-width: 568px)'
  })


  function validate(input){
    if (input.includes("youtube.com/watch")){
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

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate(inputText)){
      /* handleSubmit(getVideoCode(inputText)) */
      setVcode(getVideoCode(inputText))
    } else {
      alert("Please enter a correct youtube video url")
    }
  }

  return (
    <form onSubmit={onSubmit}>
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
  );
}

