import { useEffect, useState } from 'preact/hooks';


export default function Input() {
    const [isBeingSubmitted, setIsBeingSubmitted] = useState(false)
    const [firstUrl, setFirstUrl] = useState("")
    const [secondUrl, setSecondUrl] = useState("")
    const [error, setError] = useState("")

    const handleClick = (e) => {
        if (error) {
            e.preventDefault()
        } else {
            setIsBeingSubmitted(true)
        }
    }

    const handleChange = (e) => {
        if (e.target.id == "first") {
            setFirstUrl(e.target.value)
        } else if (e.target.id == "second") {
            setSecondUrl(e.target.value)
        }
    }

    useEffect(() => {
        console.log(firstUrl)
        console.log(secondUrl)

        if (firstUrl != "" && secondUrl != "") {
            if (firstUrl == secondUrl) {
                if (firstUrl.length > 3) {
                    setError("Both URLs are the same. You have to compare two different URLs.")
                }
            }
            else { setError("") }
        }
    }, [firstUrl, secondUrl]);

    return (
        <div class="block">


            <form name="url-input-form" id="url-input-form" method="post" action="" >

                <div class="field">
                    <label class="label">First URL:</label>
                    <div class="control">
                        <input required id="first" name="url" onChange={handleChange} class="input is-medium" type="text" placeholder="Enter URL" />
                    </div>
                </div>
                <div class="field">
                    <label class="label">Second URL:</label>
                    <div class="control">
                        <input required id="second" name="url" onChange={handleChange} class={`input is-medium ${error && "is-danger"}`} type="text" placeholder="Enter URL" />
                    </div>
                    {error &&
                        <p class="help is-danger">{error}</p>
                    }


                </div>



                <div class="field">
                    <div class="control">
                        <button onClick={handleClick} type="submit" class={`button is-primary is-medium ${isBeingSubmitted && "is-loading"}`}>Compare</button>
                    </div>
                </div>

            </form>
        </div>
    )
}


function ErrorNotification({ text }) {
    return (
        <div class="has-text-danger	">
            {text}
        </div>
    )
}