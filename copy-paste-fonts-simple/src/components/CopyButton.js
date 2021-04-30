import { Fragment } from 'preact';
import { FaCopy } from "react-icons/fa";

export const CopyButton = 
<Fragment>
  <FaCopy />
  <span style={{ marginLeft: "6px" }}>Copy to clipboard</span>
</Fragment>;