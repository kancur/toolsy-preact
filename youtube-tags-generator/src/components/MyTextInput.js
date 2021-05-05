export function InputForm({ handleSubmit, setInputText }) {
  return (
    <form onSubmit={handleSubmit}>
      <div class="field has-addons">
        <div class="control is-expanded">
          <input
            class="input"
            type="text"
            placeholder="Enter a seed keyword or seed phrase"
            onInput={e => setInputText(e.target.value)}
          />
        </div>
        <div class="control">
          <button type="submit" class="button is-danger">
            Generate tags
        </button>
        </div>
      </div>
      <div class="select">
        <select>
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Chinese</option>
        </select>
      </div>
    </form>
  );
}
