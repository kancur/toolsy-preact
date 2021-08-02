


export default function WrittenResult({ result, data }) {

    let message = '';
    let title = '';
    let colorClass = '';

    switch (result.type) {
        case 'error':
            title = 'Error'
            message = result.message
            break;
        case 'low_word_count':
            title = 'Indecisive'
            message = `There are not enough words on the page (${data.word_count} words) to reasonably talk about keyword stuffing. The apparent keyword density might seem high, but this might be totally OK for low word-count pages. The lower the total word count, the higher the impact of every single word on the total density.`
            break;
        case 'density_warning':
            title = 'Warning'
            message = <p>While none of the keywords exhibit too high keyword density, some of them might require your attention. For example <span style={{background: "#e2e2e2", padding: "4px", borderRadius: "5px"}}>{result.data.kw}</span> with a density of {result.data.density}% (used {result.data.count} times). Check the table below to see other keywords.</p>
            break;
        case 'density_danger':
            colorClass = 'has-text-danger'
            title = 'Overused keywords'
            message = <p>Some keywords are overused. The keyword with highest keyword density is <span style={{background: "#e2e2e2", padding: "4px", borderRadius: "5px"}}>{result.data.kw}</span> with a density of {result.data.density}% (used {result.data.count} times). In case this word is a brand name, it migh actually be OK. It all depends on the circumstances. Check the table below to see other keywords.</p>
            break;
/*         case 'error':
            title = 'Error'
            message = 'There was an error fetching your website. Please check if the URL is correct'
            break; */
        case 'density_pass':
            colorClass = 'has-text-success'
            title = 'Good job!'
            message = 'Your page is in great condition! We have not found any excessive repetition of keywords.'
    }


    return (
        <div class="box">
            <h2 class={`title ${colorClass}`} style={{ marginBottom: "1rem" }}>
                {title}
            </h2>
            <p>
                {message}
            </p>
        </div>
    )
}