import React from "react";
import Card from "../../components/Card";

export default function CardsArea(props) {
  return (
    <div>
      <div className="flex flex-row p-3">
        <Card width="w-32" height="h-18" bgColor="bg-purple-100">
          <div className="flex flex-col text-slate-800 pl-1">
            <p className="font-medium h-4 mb-3">Pasien</p>
            <p className="font-bold text-lg pt-4 ">32</p>
            <p className="pt-1 text-purple-500 text-sm">Hari ini</p>
          </div>
        </Card>
        <Card width="w-32" height="h-18" bgColor="bg-amber-100">
          <div className="flex flex-col text-slate-800 pl-1">
            <p className="font-medium h-4 mb-3">X-Ray</p>
            <p className="font-bold text-lg pt-4">5</p>
            <p className="pt-1 text-amber-500 text-sm">Hari ini</p>
          </div>
        </Card>
      </div>
      <div className="flex flex-row p-4">
        <Card width="w-32" height="h-18" bgColor="bg-green-100">
          <div className="flex flex-col text-slate-800 pl-1">
            <p className="font-medium h-4 mb-3">Rekam Medis</p>
            <p className="font-bold text-lg pt-4">5</p>
            <p className="pt-1 text-green-500 text-sm">Hari ini</p>
          </div>
        </Card>
        <Card width="w-32" height="h-18" bgColor="bg-sky-100">
          <div className="flex flex-col text-slate-800 pl-1">
            <p className="font-medium h-4 mb-3">Dokter</p>
            <p className="font-bold text-lg pt-4">3</p>
            <p className="pt-1 text-sky-500 text-sm">Hari ini</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
