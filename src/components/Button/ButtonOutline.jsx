import React from "react";

export default function ButtonOutline(props) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={` bg-white ${props.hoverColor} ${props.textColor} border-2 ${props.borderColor} text-sm py-1 px-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transition-none disabled:transform-none mr-2`}
    >
      {props.text}
    </button>
  );
}
