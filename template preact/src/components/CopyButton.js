import { Fragment } from 'preact';
import { FaCopy } from "react-icons/fa";

export const CopyWithIcon = (props) =>
  <Fragment>
    <FaCopy />
    <span style={{ marginLeft: "6px" }}>{props.children}</span>
  </Fragment>

