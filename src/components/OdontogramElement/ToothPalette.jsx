import React from "react";

export default function ToothPalette(props) {

  // TODO: testing
  const colors = [
    {
      color: "red",
      name: "Cavity",
    },
    {
      color: "green",
      name: "Filling",
    },
    {
      color: "blue",
      name: "Crown",
    },
  ];

  return (
    <div className="mb-3">
      {Object.values(colors).map((color, index) => (
        <div className="grid grid-cols-2">
          <div
            key={index}
            className="w-8 h-8 mb-2 flex flex-row cursor-pointer"
            style={{ backgroundColor: color.color }}
            onClick={() => props.selectedColor(color.color)}
          ></div>
          <p>{color.name}</p>
        </div>
      ))}
    </div>
  );
}
