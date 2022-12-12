import React from "react";

export default function ButtonMain(props) {
  return (
    <button
      type={props.buttonType}
      onClick={props.onClick}
      className={`${props.bgColor} ${props.hoverColor} text-white text-sm py-1 px-2 mr-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transition-none disabled:transform-none`}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}
