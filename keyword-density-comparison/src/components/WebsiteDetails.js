import { Fragment } from 'react'

const spanStyle = {
    fontWeight: "600"
}

export default function WebsiteDetails({ data }) {
    return (
        <div class="block">
            <h2 class="subtitle" style={{marginBottom: "0.75rem"}}>Showing results for:</h2>
            <p><span style={spanStyle}>Title: </span>{(data.meta?.title) ? data.meta.title : "No title specified"}</p>
            <p><span style={spanStyle}>URL: </span>{data.meta?.url}</p>
            <p><span style={spanStyle}>Word count: </span>{data.word_count}</p>
        </div>
    )
}