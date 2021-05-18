import { useState } from 'preact/hooks'
import { CopyToClipboardButton } from '../copyToClipboard'
import { useSpring, useTransition, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import { InputForm } from './InputForm';
import { callAutosuggest } from './api';
import { colorizeWord } from './colorizeWord';
const memoize = require('fast-memoize')


export default function App() {
  const [submittedText, setSubmittedText] = useState()
  const [tags, setTags] = useState()
  const [isResultsOpen, setIsResultsOpen] = useState(false)
  const [isAPIworkerFinished, setIsAPIworkerFinished] = useState(false)
  const NUMBER_OF_RUNS = 5


  const tagWorker = (query, languageCode) => {
    const tagsArray = [query];
    getTags(tagsArray, 0, languageCode)
  }
  const tagWorkerMemoized = memoize(tagWorker)


  const getTags = (arrayWithTags = [], counter, languageCode) => {
    let tempArray = [...arrayWithTags] // super important to create new object, so react can detect change, #immutability

    if (counter < NUMBER_OF_RUNS && arrayWithTags[counter]) {
      callAutosuggest(arrayWithTags[counter], languageCode)
        .then(response => {
          if (counter == 0) { tempArray = [] } // deletes the original query from the array
          response.forEach((phrase) => { if (wordCount(phrase) < 5) { tempArray.push(phrase) } }) // wordcount limiting is here
          //tempArray.push(...response) //without wordcount limiting
        })
        .then(() => setIsResultsOpen(true))
        .then(() => setTags(tempArray))
        .then(() => getTags(tempArray, counter + 1, languageCode))
    } else {
      setIsAPIworkerFinished(true)
    }
  }

  function wordCount(str) {
    return str.split(" ").length;
  }

  
  const handleSubmit = (inputText, languageCode) => {
    if (inputText.length != 0){
      const trimmedWhitespacesText = (inputText.replace(/  +/g, ' ')).trim(); //replace multiple spaces with one
      setSubmittedText(trimmedWhitespacesText)
      setIsAPIworkerFinished(false)
      setIsResultsOpen(false)
      setTags([])
      tagWorkerMemoized(trimmedWhitespacesText.trim(), languageCode)
    }
  }


  return (
    <div class="block" style={{ maxWidth: "800px" }}>
      <div class="box">
        <InputForm handleSubmit={handleSubmit} />
      </div>
      {tags && <TagsBox isOpen={isResultsOpen} isLoaded={isAPIworkerFinished} tags={tags} query={submittedText} />}
    </div>
  );
}


function TagsBox(props) {
  const [bind, { height }] = useMeasure()
  const heightprops = useSpring({ height: (height == 0) ? 0 : height })
  let finalTagsArray

  const transitions = useTransition((!!props.isOpen), {
    from: { opacity: 0 },
    enter: { opacity: 1, delay: 30 },
    leave: { opacity: 0, delay: 330 },
    unique: true,
  })

  finalTagsArray = props.tags.map((tag, i) => {
    const colorizedTag = colorizeWord(props.query, tag)
    return (
      <SingleTag key={i} colorizedTag={colorizedTag} />
    )
  }
  )

  return (transitions(
    (styles, item) => item &&
      <animated.div style={styles}>
        <div class="box is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center is-relative">
          <animated.div style={{ overflow: 'hidden', ...heightprops }}>
            <div ref={bind} class="is-relative" style={{ height: "auto" }}>
              {!props.tags.length && props.isLoaded && <p class="is-size-5 has-text-danger">No result for your query. Please try another one.</p>}
              <TagsList tags={finalTagsArray} />
              
              {!!props.tags.length && props.isLoaded && 
                <div class="has-text-centered">
                <CopyToClipboardButton text={props.tags.join(', \n')} />
                </div>
              }
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

const SingleTag = (props) => <span class="tag" style={"white-space: pre;"}>{props.colorizedTag}</span>