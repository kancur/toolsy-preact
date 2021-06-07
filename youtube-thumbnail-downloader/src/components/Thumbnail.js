import DownloadButton from './DownloadButton'
import { useEffect, useState } from 'preact/hooks';
import Skeleton from 'react-loading-skeleton';

export default function Thumbnail({ url, title, skeletonLineCount = 5 }) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [imgDimensions, setImgDimensions] = useState();


    useEffect(() => {
        setIsImageLoaded(false);
        setImgDimensions(null);
    }, [url]);


    function onImgLoad({ target: img }) {
        setImgDimensions({
            height: img.naturalHeight,
            width: img.naturalWidth
        });
        setIsImageLoaded(true)
    }


    if (url) {
        return (
            <div class="box is-flex is-flex-direction-column is-align-items-center is-relative" style={{ height: "auto" }}>
                <h2 class="title is-2 has-text-primary	">{title}</h2>
                { imgDimensions && <h3 class="subtitle has-text-grey">Dimensions: {imgDimensions?.width} x {imgDimensions?.height}</h3>}
                <div class="block has-text-centered" style="width: 100%">
                    {!isImageLoaded && <Skeleton count={skeletonLineCount} />}
                    <img style={!isImageLoaded && { display: 'none' }} src={url} onLoad={onImgLoad} />
                </div>
                <DownloadButton url={url} />
            </div>
        )
    } else {
        return null
    }
}