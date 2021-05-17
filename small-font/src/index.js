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