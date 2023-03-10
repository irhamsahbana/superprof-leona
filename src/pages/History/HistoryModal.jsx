import React from "react";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";

export default function HistoryModal({ open, handleClose, historyData, i }) {
  const navigate = useNavigate();
  const handleNavigateViewMore = () => {
      navigate("/history-transaksi/selected");
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: "bold", mb: 2 }}>
        {historyData[i].id_transaksi}
      </DialogTitle>
      <DialogContent>
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
            <p className="w-44 font-semibold">{historyData[i].tindakan}</p>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleNavigateViewMore} autoFocus>
          View More
        </Button>
      </DialogActions>
    </Dialog>
  );
}
