import React from "react";
import ButtonTextIcon from "./ButtonTextIcon";
import { IoMdAdd } from "react-icons/io";

export default function ButtonAdd(props) {
  return (
    <button
      onClick={props.onClick}
      className={`bg-blue-400 hover:bg-blue-600 text-white text-base px-2 mr-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transition-none disabled:transform-none`}
    >
      <div className="flex flex-row text-sm">
        <span className="text-white font-semibold text-sm mr-2 mt-[1.5px]">
          {<IoMdAdd />}
        </span>
        Tambah Data
      </div>
    </button>
  );
}
