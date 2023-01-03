import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import { AiFillEye, AiOutlineRight } from "react-icons/ai";
import { ButtonIcon } from "../../components/Button";
import HistoryData from "../../data/HistoryData.json";
import { useSpinner } from "../../utils/customHooks";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";
import MainService from "../../services/MainService";
export default function DokRekamMedis() {
  const [showHistory, setShowHistory] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [rmList, setRmList] = useState([]);

  const { rekamMedisResults } = useSelector((state) => state.rekamMedis);
  const historyData = HistoryData[0].now;

  const navigate = useNavigate();
  const showSpinner = useSpinner();
  // fetch all lists here
  useEffect(() => {
    MainService.getAll("schedules?q=drg.%20A").then((res) => {
      setRmList(res);
      console.log(rmList.length);
    });
  }, [setRmList.length]);

  const handleClose = () => {
    setShowHistory(false);
  };
  const cols = useMemo(
    () => [
      {
        header: "No. Rekam Medis",
        accessorKey: "no_rm",
      },
      {
        header: "Nama Pasien",
        accessorKey: "pasien",
      },
      {
        header: "Transaksi Terakhir",
        accessorKey: "keterangan",
      },
    ],
    []
  );

  return (
    <>
      <div className="mb-5">
        <h1>
          Rekam Medis: <span className="text-blue-500 text-2xl">Dokter</span>
        </h1>
        <p className="text-lg">
          Semua rekam medis pasien yang pernah ditangani oleh dokter
        </p>
      </div>
      <MaterialReactTable
        columns={cols}
        data={rmList}
        localization={{
          actions: "",
        }}
        initialState={{ columnVisibility: { dob: false, email: false } }}
        enableEditing
        renderRowActions={({ row, table }) => (
          <Tooltip arrow placement="left" title="Edit">
            <IconButton
              onClick={() => {
                console.log(row);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        )}
      />
    </>
  );
}
