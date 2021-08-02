
export default function resultDecider(data, criticalDensity) {

    console.log(`resultdecider called with following`)
    console.log(data)
    console.log(criticalDensity)

    const maxDensKw = maxDensityOverall(data.max_density)

    console.log(`max density overall`)
    console.log(maxDensKw)

    if (data.word_count < 250) {
        return { type: "low_word_count" }
    } else if (maxDensKw.density > criticalDensity) {
        return {
            type: "density_danger",
            data: maxDensKw
        }
    }
    return {
        type: "density_pass",
        data: maxDensKw
    }

}


function maxDensityOverall(maxDensity) {
    let tempMax = 0
    let maxDensityKeywordData = {}

    for (let data of Object.entries(maxDensity)) {
        if (data[1].density > tempMax) {
            tempMax = data[1].density
            maxDensityKeywordData = data[1]
            maxDensityKeywordData['type'] = data[0]
        }
    }

    return maxDensityKeywordData
}