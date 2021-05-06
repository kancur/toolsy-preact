import { useState } from 'preact/hooks'
import { useMediaQuery } from 'react-responsive'


export function InputForm({ handleSubmit }) {
  const [inputText, setInputText] = useState()
  const [lang, setLang] = useState(localStorage.getItem('lang'))
  const isSmall = useMediaQuery({
    query: '(max-device-width: 568px)'
  })

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(inputText, lang)
  }

  return (
    <form onSubmit={onSubmit}>
      <div class="field has-addons">
        <div class="control is-expanded">
          <input
            maxLength="50"
            class="input"
            type="text"
            placeholder="Enter a seed keyword or seed phrase"
            onInput={e => setInputText(e.target.value)}
          />
        </div>
        <div class="control">
          <LanguageSelector setLang={setLang} value={lang} />
        </div>
        {
          !isSmall &&
          <div class="control">
            <button type="submit" class="button is-danger">
              Generate tags
            </button>
          </div>
        }
      </div>
      {
        isSmall &&
        <div class="control is-expanded">
            <button type="submit" class="button is-danger is-fullwidth">
              Generate tags
            </button>
        </div>
      }

    </form>
  );
}
const LanguageSelector = ({ setLang, value }) =>
  <div class="select">
    <select value={value} onChange={e => {
      localStorage.setItem('lang', e.target.value)
      setLang(e.target.value)
    }}>
      <option value="en">English</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
      <option value="de">German</option>
      <option value="hi">Hindi</option>
      <option value="ru">Russian</option>
      <option value="zh-cn">Chinese</option>
    </select>
  </div>

