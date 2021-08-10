import { useEffect } from 'preact/hooks'
import { Fragment } from 'react'
import Input from './Input'
import { placeholder } from './placeholder'

export default function App() {
  const CRITICAL_DENSITY = 3

  //const dataFromAPI = placeholder
  const dataFromAPI = window.receivedData
  const isSubmitted = window.isSubmitted === 1


  useEffect(() => {
    if (dataFromAPI) {
      console.log(dataFromAPI)
      //setResult(resultDecider(dataFromAPI, CRITICAL_DENSITY))
    }
  }, [])


  return (
    <div>

      <div class="block" style={{ maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>

        <div class="box">
          <Input />
        </div>


        {!dataFromAPI && isSubmitted &&
          <div class="box">
            Server error. Please let us know at info@toolsy.dev
          </div>
        }

        {dataFromAPI &&
          <Fragment>

            {"error" in dataFromAPI &&
              <div class="box">
                <h2 class="title is-4">Error fetching {dataFromAPI.url}</h2>
                <p>
                  Error: {dataFromAPI.error}
                </p>
              </div>
            }

          </Fragment>
        }
      </div>

      <ResultsPart />

    </div>
  )
}


function ResultsPart() {
  return (
    <p>Hovno</p>
  )
}