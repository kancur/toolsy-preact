import { Fragment } from "preact";

//new string function to insert string at a given index
String.prototype.insert = function (index, string) {
    if (index > 0) {
        return this.substring(0, index) + string + this.substr(index);
    }
    return string + this;
};

//returns a JSX object with <span> tags correctly positiioned around matched phrase
export function colorizeWord(select, text) {
    const selLength = select.length
    const n = text.indexOf(select);
    let finalJSX
    let secondJSX

    const firstPart = text.slice(0, n);
    const secondPart = text.slice(n, n + selLength);
    const thirdPart = text.slice(n + selLength);

    if (n !== -1) {
        secondJSX = <span class="has-text-link-dark">{secondPart}</span>
        finalJSX = <Fragment>{firstPart}{secondJSX}{thirdPart}</Fragment>
    } else {
        finalJSX = <Fragment>{text}</Fragment>
    }
    return finalJSX
}