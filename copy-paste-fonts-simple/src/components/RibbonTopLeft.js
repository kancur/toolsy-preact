import { shade } from "./shade";
import '../Style'


export function RibbonTopLeft({ color = "#ff8f2f", ...props }) {
  const SPANSTYLE = {
    "--spanbgcolor": shade(color, -0.2),
    background: `linear-gradient(${shade(color, 0.2)} 0%,${color} 100%)`
  };

  return (
    <div class="ribbon unselectable"> <span style={SPANSTYLE}>{props.children}</span></div>
  );
}

