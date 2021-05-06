import fetchJsonp from  'fetch-jsonp';

const parseJson = (data) => {
    const mainArray = [...data[1]]
    let newArray = []
    for (let i = 0; i < mainArray.length; i++) {
        newArray.push(mainArray[i][0])
    }
    return newArray
}

export const callAutosuggest = async (query, language) => {
    const encodedQuery = encodeURIComponent(`${query} `) //adding a space after query
    let jsondata

    const data = await fetchJsonp(`https://clients1.google.com/complete/search?client=youtube&gl=us&hl=${language}&q=${encodedQuery}`)
        .then((response) => {
            return response.json()
        }).then((json) => {
            jsondata = parseJson(json)
            console.log(jsondata)
        }).catch((ex) => {
            console.log('parsing failed', ex)
        })
    return jsondata
}


export const callSearchSuggest = async (query) => {
    const encodedQuery = encodeURIComponent(query)
    let jsondata

    const data = await fetchJsonp(`https://suggestqueries.google.com/complete/search?client=chrome&hl=en&ds=yt&gl=us&q=${encodedQuery}`)
        .then((response) => {
            return response.json()
        }).then((json) => {
            jsondata = json
        }).catch((ex) => {
            console.log('parsing failed', ex)
        })

    return jsondata[1]
}