export function MyTextInput({ setText }) {
  return (
    <input
      onInput={e => setText(e.target.value)}
      class="input is-primary"
      type="text"
      placeholder="Type your name here"
    />
  )
}
