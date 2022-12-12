import React from "react";
import Card from "../../components/Card";
import { BsPersonFill, BsPeopleFill } from "react-icons/bs";

export default function VerticalCards() {
  return (
    <div className="px-0 py-8 flex flex-col">
      <div className="mb-4">
        <Card bgColor="bg-slate-50" width="w-max" height="h-28">
          <div className="flex flex-row text-sm">
            <div className="mb-12 rounded-lg bg-green-100 py-2 px-2 w-16">
              <BsPersonFill className="w-12 h-auto text-green-300" />
            </div>
            <div className="flex flex-col ml-5 pt-2">
              <p className="text-gray-800 text-medium">Pemasukan bulan ini</p>
              <p className="font-bold text-gray-800">Rp.325jt</p>
              <p className="mt-1 text-medium text-green-400 font-bold">
                +3%
              </p>
            </div>
          </div>
        </Card>
      </div>
      <div className="mr-3">
        <Card bgColor="bg-slate-50" width="w-auto" height="h-28">
          <div className="flex flex-row text-sm">
            <div className="mb-12 rounded-lg bg-amber-100 py-2 px-2 w-16">
              <BsPeopleFill className="w-12 h-auto text-amber-300" />
            </div>
            <div className="flex flex-col ml-5 pt-2">
              <p className="text-gray-800">Tahun ini</p>
              <p className="font-bold text-gray-800">Rp.50M</p>
              <p className="mt-1 text-medium text-amber-400 font-bold">
                +3.98%
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
