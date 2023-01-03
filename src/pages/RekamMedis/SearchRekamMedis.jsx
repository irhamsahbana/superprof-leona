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

export default function SearchRekamMedis() {
  const [showHistory, setShowHistory] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const { rekamMedisResults } = useSelector((state) => state.rekamMedis);
  const historyData = HistoryData[0].now;

  const navigate = useNavigate();
  const showSpinner = useSpinner();

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
        accessorKey: "address",
      },
    ],
    []
  );

  return (
    <>
      <div className="mb-5">
        <h1>
          Rekam Medis: <span className="text-blue-500 text-2xl">Search</span>
        </h1>
      </div>
      <MaterialReactTable
        columns={cols}
        data={rekamMedisResults}
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
                navigate("/rekam-medis/selected");
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
