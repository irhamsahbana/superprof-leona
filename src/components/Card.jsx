import React from "react";

export default function Card(props) {
  // TODO: add shadow
  return (
    <>
      <div className="max-w-screen-md pr-3">
        <div
          className={`${props.width} ${props.height} rounded-lg p-4 flex flex-col justify-between leading-normal ${props.bgColor}`}
        >
          <div className="flex justify-between">{props.children}</div>
        </div>
      </div>
    </>
  );
}
