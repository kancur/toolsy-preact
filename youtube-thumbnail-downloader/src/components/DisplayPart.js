import { Fragment } from "preact";
import Thumbnail from './Thumbnail';


export default function DisplayPart({ data }) {

    return (
        <Fragment>
                <Fragment>
                    <Thumbnail title="Maximum resolution thumbnail" url={data?.maxResDefault} skeletonLineCount={8}/>
                    <Thumbnail title="High resolution thumbnail" url={data?.hqDefault} skeletonLineCount={6}/>
                    <Thumbnail title="Medium resolution thumbnail" url={data?.mqDefault} skeletonLineCount={4}/>
                    <Thumbnail title="Small resolution thumbnail" url={data?.defaultThumb} skeletonLineCount={2}/>
                </Fragment>

        </Fragment>
    )
}