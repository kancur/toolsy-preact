export function MyTextInput({ setText }) {
  return (
    <textarea
      data-gramm_editor="false"
      id="text-input"
      onInput={e => setText(e.target.value)}
      class="textarea"
      placeholder="Type or paste any text here!" />
  );
}
