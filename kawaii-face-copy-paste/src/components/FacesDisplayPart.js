import { Fragment, useState } from 'react';
import { kawaii } from './kawaiiData';
import { capitalizeFirstLetter } from './App';
import "./Style"

export function FacesDisplayPart() {
    const categories = Object.keys(kawaii);


    return (
        <div class="box">
            {categories.map((category) => <SingleCategoryKawaiiPart key={category} category={category} />)}
        </div>
    );
}



function SingleCategoryKawaiiPart({ category }) {
    const faces = kawaii[category] // get faces for current category

    return (
        <Fragment>
            <h1 class="title has-text-centered	">{capitalizeFirstLetter(category)} faces</h1>
            <div class="tags are-large is-justify-content-center">
                {faces.map((face) => <SingleFaceDisplay key={face} face={face} />)}
            </div>
        </Fragment>
    );
}


const SingleFaceDisplay = ({ face }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isMouseEntered, setIsMouseEntered] = useState(false);

    const handleClick = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false)
        }, 400);
    }



    const tagstyle = {
        marginRight: 0,
        marginBottom: 0,
        borderColor: isCopied ? "#00D1B2" : "",
    }

    return (
        <div onMouseEnter={() => setIsMouseEntered(true)} onMouseLeave={() => setIsMouseEntered(false)} onClick={handleClick} class="facediv tagparent">
            <span style={tagstyle} class="tag is-large facetag" >
                {face}
            </span>
            <span class="clicktocopy" style={{ background: isCopied ? "#00D1B2" : "" }} >{!isCopied ? "Click to copy" : "Copied"}</span>
        </div>

    )
}
