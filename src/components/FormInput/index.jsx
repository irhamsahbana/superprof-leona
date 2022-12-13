import React from "react";

export default function FormInput(props) {
  return (
    <div className="pr-4">
      <label
        htmlFor={props.text}
        className="block mb-1 text-sm font-medium text-gray-900"
      >
        {props.text}
      </label>
      <div>
        <input
          type={props.type}
          name={props.name}
          defaultValue={props.value}
          className={`${props.width} h-8 w-max bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 block py-2 px-3 `}
          placeholder={props.placeholder}
          onChange={props.onChange}
          required
        />
      </div>
    </div>
  );
}
