import { useState, useEffect } from 'preact/hooks'
import { copyTextToClipboard } from '../copyToClipboard'
import { useSpring, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import { InputForm } from './MyTextInput';
import { callAutosuggest, callSearchSuggest } from './api'

export default function App() {
  const [inputText, setInputText] = useState()
  const [tags, setTags] = useState()
  const NUMBER_OF_RUNS = 5

  const tagWorker = (NUMBER_OF_RUNS, query) => {
    const tagsArray = [query];

    getTags(tagsArray, 0)
  }

  const getTags = (arrayWithTags = [], counter) =>{
    const tempArray = [...arrayWithTags] // super important to create new object, so react can detect change, #immutability
    if (counter < NUMBER_OF_RUNS && arrayWithTags[counter]) {
//      console.log(`counter: ${counter} arrayWithTags: ${arrayWithTags}`)
      callAutosuggest(arrayWithTags[counter])
        .then(response => tempArray.push(...response))
        .then(() => setTags(tempArray))
        .then(() => getTags(tempArray, counter+1))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    tagWorker(5, inputText)
  }

  return (
    <div class="block" style={{ maxWidth: "800px" }}>
      <div class="box">
        <h2 class="title is-2 has-text-primary">Enter a keyword to generate tags from</h2>
        <InputForm setInputText={setInputText} handleSubmit={handleSubmit} setText={setInputText} />
      </div>
      <TagsBox tags={tags} />
    </div>
  );
}

function TagsBox(props) {
  const [bind, { height }] = useMeasure()
  const heightprops = useSpring({ height: (height == 0) ? 36 : height })
  const myTags = [...props.tags]
  let receivedTags

  if (props.tags){
    receivedTags = myTags.slice(1)
  }

  /*   const isMobile = useMediaQuery({
      query: '(max-device-width: 768px)'
    }) */

  return (
    <div class="box is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center is-relative">

      <animated.div style={{ overflow: 'hidden', ...heightprops }}>

        <div ref={bind} class="is-relative" style={{ height: "auto" }}>
          <div class="tags are-large">
            {receivedTags && receivedTags.map((tag, i) =>
              <span key={i} class="tag">{tag}</span>
            )}
          </div>
        </div>

      </animated.div>

    </div>
  )
}

