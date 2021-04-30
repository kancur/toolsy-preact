export function convertText(text, datatable) {
  return text.split('').map(character => {
    if (character in datatable.data) {
      return datatable.data[character]
    }
    if ((/\r|\n/).exec(character)) {
      return "\n"
    }
    return character
  }).join('')
}
