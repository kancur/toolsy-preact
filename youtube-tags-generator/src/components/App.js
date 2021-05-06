import { useEffect, useRef, useState } from 'preact/hooks'
import { copyTextToClipboard } from '../copyToClipboard'
import { useSpring, useTransition, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import { InputForm } from './MyTextInput';
import { callAutosuggest } from './api';
import { colorizeWord } from './colorizeWord';
const memoize = require('fast-memoize')


export default function App() {
  const [submittedText, setSubmittedText] = useState()
  const [tags, setTags] = useState()
  const NUMBER_OF_RUNS = 8

  const tagWorker = (NUMBER_OF_RUNS, query, languageCode) => {
    const tagsArray = [query];
    getTags(tagsArray, 0, languageCode)
  }
  const tagWorkerMemoized = memoize(tagWorker)


  const getTags = (arrayWithTags = [], counter, languageCode) => {
    let tempArray = [...arrayWithTags] // super important to create new object, so react can detect change, #immutability

    if (counter < NUMBER_OF_RUNS && arrayWithTags[counter]) {
      callAutosuggest(arrayWithTags[counter], languageCode)
        .then(response => {
          if (counter == 0) { tempArray = [] }
          response.forEach((phrase) => { if (wordCount(phrase) < 5) { tempArray.push(phrase) } })
          //tempArray.push(...response)
        })
        .then(() => setTags(tempArray))
        .then(() => getTags(tempArray, counter + 1))
    }
  }

  function wordCount(str) {
    return str.split(" ").length;
  }

  const handleSubmit = (inputText, languageCode) => {
    const trimmedWhitespacesText = (inputText.replace(/  +/g, ' ')).trim(); //replace multiple spaces with one
    setSubmittedText(trimmedWhitespacesText) //trime leading and trailing whitespaces
    setTags([])
    tagWorkerMemoized(5, trimmedWhitespacesText.trim(), languageCode)
  }


  return (
    <div class="block" style={{ maxWidth: "800px" }}>
      <div class="box">
        <h2 class="title is-2 has-text-primary">Enter a keyword</h2>
        <InputForm handleSubmit={handleSubmit} />
      </div>
      {tags && <TagsBox tags={tags} query={submittedText} />}
    </div>
  );
}


function TagsBox(props) {
  const [bind, { height }] = useMeasure()
  const heightprops = useSpring({ height: (height == 0) ? 0 : height })
  let finalTagsArray

  const transitions = useTransition(!!props.tags.length, {
    from: { opacity: 0 },
    enter: { opacity: 1, delay: 30 },
    leave: { opacity: 0, delay: 330 },
    unique: true,
  })

  finalTagsArray = props.tags.map((tag, i) => {
    const colorizedTag = colorizeWord(props.query, tag)
    return (
      <SingleTag key={i} colorizedTag={colorizedTag} />
      )}
  )

  return (transitions(
    (styles, item) => item &&
      <animated.div style={styles}>
        <div class="box is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center is-relative">
          <animated.div style={{ overflow: 'hidden', ...heightprops }}>
            <div ref={bind} class="is-relative" style={{ height: "auto" }}>
              <TagsList tags={finalTagsArray} />
              {!!props.tags.length && (<div class="has-text-centered"><button onClick={() => { copyTextToClipboard(props.tags.join(', \n')) }} class="button is-link">Copy to clipboard</button></div>)}
            </div>
          </animated.div>
        </div>
      </animated.div>
  )
  )
}


const TagsList = (props) =>
  <div class="tags are-large">
    {props.tags}
  </div>;

const SingleTag = (props) =>  <span class="tag" style={"white-space: pre;"}>{props.colorizedTag}</span>


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}