import { useState } from 'preact/hooks';

export default function Input() {
    const [isClicked, setIsClicked] = useState(false)
    const handleClick = () => (setIsClicked(true))

    return (
        <div class="block">
            <form name="url-input-form" id="url-input-form" method="post" action="" >
                <div class="field has-addons">
                    <div class="control is-expanded">
                        <input name="url" class="input is-medium" type="text" placeholder="Enter your URL" />
                    </div>
                    <div class="control">
                        <button onClick={handleClick} type="submit" class={`button is-primary is-medium ${isClicked && "is-loading"}`}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}