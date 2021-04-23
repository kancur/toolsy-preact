const SUPERSCRIPTS = {
  ' ': ' ',
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  '+': '⁺',
  '-': '⁻',
  'a': 'ᵃ',
  'b': 'ᵇ',
  'c': 'ᶜ',
  'd': 'ᵈ',
  'e': 'ᵉ',
  'f': 'ᶠ',
  'g': 'ᵍ',
  'h': 'ʰ',
  'i': 'ⁱ',
  'j': 'ʲ',
  'k': 'ᵏ',
  'l': 'ˡ',
  'm': 'ᵐ',
  'n': 'ⁿ',
  'o': 'ᵒ',
  'p': 'ᵖ',
  'r': 'ʳ',
  's': 'ˢ',
  't': 'ᵗ',
  'u': 'ᵘ',
  'v': 'ᵛ',
  'w': 'ʷ',
  'x': 'ˣ',
  'y': 'ʸ',
  'z': 'ᶻ'
}

const SMALLCAPS = {
  " " : " ",
  "a" : "ᴀ",
  "b" : "ʙ",
  "c" : "ᴄ",
  "d" : "ᴅ",
  "e" : "ᴇ",
  "f" : "ғ",
  "g" : "ɢ",
  "h" : "ʜ",
  "i" : "ɪ",
  "j" : "ᴊ",
  "k" : "ᴋ",
  "l" : "ʟ",
  "m" : "ᴍ",
  "n" : "ɴ",
  "o" : "ᴏ",
  "p" : "ᴘ",
  "q" : "ǫ",
  "r" : "ʀ",
  "s" : "s",
  "t" : "ᴛ",
  "u" : "ᴜ",
  "v" : "ᴠ",
  "w" : "ᴡ",
  "x" : "x",
  "y" : "ʏ",
  "z" : "ᴢ"
}

function convertText(text, datatable){
  const lowercase = text.toLowerCase()
  return lowercase.split('').map(function(character) {
    if(character in datatable) {
      return datatable[character]
    }
    if ((/\r|\n/).exec(character)){
      return "\n"
    }
    return ''
  }).join('')
}

export function toSuperScript(text) {
  return convertText(text, SUPERSCRIPTS)
}

export function toSmallCaps(text) {
  return convertText(text, SMALLCAPS)
}