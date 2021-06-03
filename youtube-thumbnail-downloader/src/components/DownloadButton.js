
export default function DownloadButton({url}) {
    const proxiedUrl = `https://proxy.toolsy.workers.dev/?${url}`

    return (
        <a href={proxiedUrl} download>
            <button class="button is-info">Download</button>
        </a>
    )
}