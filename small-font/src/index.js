import habitat from "preact-habitat";
import { render } from 'preact';


import Widget from "./components/App";

let _habitat = habitat(Widget);

_habitat.render({
  selector: '[data-widget-host="habitat"]',
  clean: true,
});



// preact build --no-prerender --no-sw --no-esm

//toolsy.dev

/* let shadowTarget = document.createElement("div");
shadowTarget.id = "shadow-target";
document.body.appendChild(shadowTarget);
let shadow = shadowTarget.attachShadow({ mode: "open" });
let shadowRoot = document.createElement("div");
shadowRoot.id = "shadow-root";

shadow.appendChild(shadowRoot);

render(<Widget />, shadowRoot); */