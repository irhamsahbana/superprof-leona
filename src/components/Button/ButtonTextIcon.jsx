import React from "react";

export default function ButtonTextIcon(props) {
  return (
    <button
      onClick={props.onClick}
      className={`${props.bgColor} ${props.hoverColor} text-white text-base px-2 mr-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transition-none disabled:transform-none`}
    >
      <div className="flex flex-row text-sm">
        <span className="text-white font-semibold text-sm mr-1">{props.icon}</span>
        {props.text}
      </div>
    </button>
  );
}
