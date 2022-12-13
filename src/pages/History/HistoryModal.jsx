import React from "react";
import { ButtonMain, ButtonOutline } from "../../components/Button";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom";

export default function HistoryModal({ handleClose, historyData, i }) {
  const navigate = useNavigate();
  const handleNavigateViewMore = () => {
    navigate("/history-transaksi/selected");
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 z-10 backdrop-opacity-10 backdrop-invert">
      <div className="flex-col bg-white py-12 px-16 rounded-xl">
        <h3 className="text-center text-xl font-Inter font-bold text-main-blue mb-8 text-blue-600">
          {historyData[i].id_transaksi}
        </h3>
        <div id="content" className="flex flex-col justify-center">
        <div className="flex flex-col mb-4 border-b border-b-slate-100">
          <div className="flex flex-row justify-between pb-2">
            <p className="w-24 mr-8 text-slate-500">Tanggal</p>
            <p className="w-44">{historyData[i].tanggal}</p>
          </div>
          </div>
          <div className="flex flex-row justify-between pb-2">
            <p className="w-24 flex flex-wrap text-slate-500">
              Dokter yang menangani:
            </p>
            <p className="w-44 flex flex-wrap">{historyData[i].dokter}</p>
          </div>
          <div className="flex flex-row justify-between pb-2">
            <p className="w-24 mr-8 text-slate-500">Tindakan</p>
            <p className="w-44">{historyData[i].tindakan}</p>
          </div>

          <div className="flex flex-row justify-between pb-2">
            <p className="w-24 mr-8 text-slate-500">Total Bayar</p>
            <div className="w-44">
              <Tag color="blue">{historyData[i].total}</Tag>
            </div>
          </div>
          <div className="flex flex-row justify-between pb-2">
            <p className="w-24 mr-8 text-slate-500">Diskon</p>
            <p className="w-44">-</p>
          </div>
          <div className="flex flex-row  pb-2">
            <p className="w-24 mr-8 text-slate-500">Status</p>
            <div>
              {historyData[i].status === `Lunas` ? (
                <Tag color="green">{historyData[i].status}</Tag>
              ) : (
                <Tag color="red">{historyData[i].status}</Tag>
              )}
            </div>
          </div>
          <div className="flex flex-col pb-2 pt-2 mt-2 border-t border-t-slate-100">
            <p className="w-24 mr-8 text-slate-500 pt-2">Keterangan</p>
            <p className="w-full">{historyData[i].keterangan}</p>
          </div>
        </div>

        <div className="float-right mt-4 flex flex-row">
          <ButtonOutline
            text="Cancel"
            hoverColor="hover:bg-slate-50"
            textColor="text-blue-400"
            borderColor="border-blue-400"
            onClick={handleClose}
          />
          <ButtonMain
            text="View More"
            hoverColor="hover:bg-blue-500"
            bgColor="bg-blue-400"
            onClick={handleNavigateViewMore}
          />
        </div>
      </div>
    </div>
  );
}
