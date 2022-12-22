import React, { useEffect, useState } from "react";
import MainCalendar from "../../components/MainCalendar";

export default function DokDashboard() {
  return (
    <div>
      <h1 className="mb-8">Welcome Doctor</h1>

      <div className="flex flex-col md:flex-row lg:flex-row mb-3">
       <p>hello</p>
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
 