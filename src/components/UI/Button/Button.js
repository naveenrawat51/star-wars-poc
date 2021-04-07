import React from "react";
import styles from "./Button.module.css";

const button = (props) => (
  <button
    className={[styles.button, styles[props.btnType]].join(" ")}
    disabled={props.disabled}
    onClick={props.clicked}
    type={props.type}
  >
    {props.children}
  </button>
);

export default button;
