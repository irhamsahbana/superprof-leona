import React from "react";
import CardsArea from "./CardsArea";
import VerticalCards from "./VerticalCards";

export default function OverviewArea() {
  return (
    <div className="">
      <p className="font-bold text-xl">Overview:</p>
      <p className="text-gray-500 mb-4">Analisis data secara gambaran besar</p>
      <div className="bg-white shadow-lg rounded-2xl p-2 flex flex-row">
        <CardsArea />
        <VerticalCards />
      </div>
    </div>
  );
}
