import React from "react";

export default function ToothPalette(props) {
  const colors = ["red", "green", "blue"];
  return (
    <div>
      {colors.map((color, index) => (
        <div
          key={index}
          className="w-8 h-8 mx-8 my-8 flex flex-row cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={() => props.selectedColor(color)}
        ></div>
      ))}
    </div>
  );
}