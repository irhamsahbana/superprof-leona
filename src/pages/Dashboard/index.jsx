import React, { useEffect, useState } from "react";
import ToDoCard from "./ToDoCard";
import MainCalendar from "../../components/MainCalendar";
import OverviewArea from "./OverviewArea";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => console.log(isLoggedIn), []);
  
  return (
    <div>
      <h1 className="mb-12">Welcome Home</h1>

      <div className="flex flex-col md:flex-row lg:flex-row mb-3">
        <OverviewArea />
        <ToDoCard />
      </div>
      <div>
        <p className="font-bold text-xl mt-8">Jadwal Operasi:</p>
        <p className="text-gray-500 mb-4">Overview dari jadwal pasien</p>
        <div className="bg-white shadow-lg rounded-2xl p-5">
          <MainCalendar />
        </div>
      </div>
    </div>
  );
}
