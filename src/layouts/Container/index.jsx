import React from "react";

export default function Container({ children, text, className }) {
  return (
    <div className={`flex flex-col mb-2 ${className}`}>
      <div className="font-bold text-xl">{text}</div>
      <div
        className={`bg-white shadow-lg rounded-2xl p-5 max-w-full`}
      >
        {children}
      </div>
    </div>
  );
}
