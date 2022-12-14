import React from "react";

export default function Pagination(props) {
  return (
    <div>
      <button
        className="relative inline-flex items-center px-2 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.icon}
      </button>
    </div>
  );
}
