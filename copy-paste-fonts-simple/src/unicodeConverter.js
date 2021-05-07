const memoize = require('fast-memoize')

const convertToArray = function (text) {return Array.from(text)}
const memoizedArray = memoize(convertToArray);
// eslint-disable-next-line no-unused-vars
const x = "Peter Smid"

export function convertText(text, datatable) {
  const originalTextArray = memoizedArray(text)
  const convertedText = originalTextArray.map(character => {
    if (character in datatable.data) {
      return datatable.data[character]
    }
    if ((/\r|\n/).exec(character)) {
      return "\n"
    }
    return character
  }).join('')

  return convertedText
}


export function addSymbolBetweenChars(text, symbol) {
  let newtext = []

  const originalTextArray = memoizedArray(text)

  originalTextArray.map((character, index, array) => {
    const previousCharacter = array[index - 1]

    if ((testCharacterIsAlphanumeric(previousCharacter) && (testCharacterIsAlphanumeric(character)))) {
      newtext.push(symbol)
    }

    if (character === " ") {
      character = " " //different type of space
    }
    newtext.push(character)
  })

  return newtext.join('')
}


function testCharacterIsAlphanumeric(character) {
  if (character) {
    const regex = /^$|\s+/;
    return !regex.test(character)
  } return false
}

export function encloseCharBetweenSymbols(text, symbolRight, symbolLeft) {
  let newtext = []

  const originalTextArray = memoizedArray(text)

  originalTextArray.map((character) => {
    if ((testCharacterIsAlphanumeric(character))) {
      newtext.push(symbolRight)
      newtext.push(character)
      newtext.push(symbolLeft)
    }

    if (character === " ") {
      character = " " //different type of space
      newtext.push(character)
    }
  })
  return newtext.join('')
}

export function encloseCharBetweenWords(text, symbolLeft, symbolRight) {
  let newtext = []

  const originalTextArray = memoizedArray(text)

  originalTextArray.map((character, index, array) => {
    const nextCharacter = array[index + 1]
  
    if (index === 0){
      newtext.push(symbolLeft)
    }

    newtext.push(character)

    if ( !testCharacterIsAlphanumeric(character) && testCharacterIsAlphanumeric(nextCharacter) ){
      newtext.push(symbolLeft)
    }

    if ( testCharacterIsAlphanumeric(character) && !testCharacterIsAlphanumeric(nextCharacter) ){
      newtext.push(symbolRight)
    }
  })
  return newtext.join('')
}

export function unicodeCombine(text, characterCodes) {
  let newtext = []

  const originalTextArray = memoizedArray(text)

  originalTextArray.map((character) => {
    const pimpedChar = character + characterCodes
    newtext.push(pimpedChar)
  })
  return newtext.join('')
}

export function encloseInSymbols(text, symbolLeft, symbolRight) {
  return symbolLeft + text + symbolRight
}