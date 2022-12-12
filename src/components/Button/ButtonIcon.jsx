import React from "react";

export default function ButtonIcon(props) {
  return (
    <button
      className={`${props.bgColor} ${props.hoverColor} text-white text-sm font-bold py-1 px-1 md:px-2 lg:px-2 rounded-md mr-1`}
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );
}
