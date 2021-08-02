import { useEffect } from 'preact/hooks'
import { Fragment } from 'react'
import Input from './Input'
import WrittenResult from './WrittenResult'
import resultDecider from './resultDecider'
import { placeholder } from './placeholder'
import { KeywordDensityTables } from './KeywordDensityTables'
import WebsiteDetails from './WebsiteDetails'

export default function App() {
  const CRITICAL_DENSITY = 3

  //const dataFromAPI = placeholder
  const dataFromAPI = window.receivedData
  const isSubmitted = window.isSubmitted === 1
  let result = null

  if (dataFromAPI && !('error' in dataFromAPI)) {
    result = resultDecider(dataFromAPI, CRITICAL_DENSITY)
  }

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
          {result &&
            <WebsiteDetails data={dataFromAPI}/>
          }
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

            {result &&
              <WrittenResult result={result} data={dataFromAPI} critical_density={CRITICAL_DENSITY} />
            }
          </Fragment>
        }
      </div>


      {result &&
        <KeywordDensityTables dataFromAPI={dataFromAPI} critical_density={CRITICAL_DENSITY} />
      }

    </div>
  )
}



