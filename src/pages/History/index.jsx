import React, { useEffect, useState, useMemo } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import HistoryData from "../../data/HistoryData.json";
import HistoryModal from "./HistoryModal";
import { useNavigate } from "react-router-dom";
import MaterialReactTable from "material-react-table";
import { Box, Button, IconButton, Tooltip, TextField } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";

import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function History() {
  const navigate = useNavigate();

  const [showHistory, setShowHistory] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs().format());

  const historyData = HistoryData[0].now;

  const handleClose = () => {
    setShowHistory(false);
  };

  const handleChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const cols = useMemo(
    () => [
      {
        header: "Nama Pasien",
        accessorKey: "nama",
      },
      {
        header: "Tanggal",
        accessorKey: "tanggal",
      },
      {
        header: "Dokter yang menangani",
        accessorKey: "dokter",
      },
      {
        header: "Tindakan",
        accessorKey: "tindakan",
      },
    ],
    []
  );
  return (
    <>
      <div className="mb-4">
        <h1>
          Data Transaksi:{" "}
          <span className="text-blue-500 text-2xl">History</span>
        </h1>
      </div>
      <div className="mb-4">
        <Box sx={{ display: "flex", mb: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              inputFormat="DD/MM/YYYY"
              value={selectedDate}
              size="small"
              onChange={handleChange}
              renderInput={(params) => (
                <TextField
                  sx={{
                    ".MuiInputBase-input": { pt: 1.6, pb: 1.2, width: 98 },
                    ".MuiInputBase-root-MuiOutlinedInput-root": {
                      backgroundColor: "white",
                    },
                  }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
          <div className="flex">
            <Button
              sx={{ ml: 1, mt: 0.5, mb: 0.5 }}
              // onClick={() => {}}
              size="small"
              variant="contained"
            >
              Tampilkan
            </Button>
          </div>
          <div className="flex">
            <Button
              sx={{ ml: 1, mt: 0.5, mb: 0.5 }}
              // onClick={() => {}}
              size="small"
              variant="contained"
            >
              Semua Transaksi
            </Button>
          </div>
        </Box>
      </div>

      <MaterialReactTable
        columns={cols}
        data={historyData}
        sx={{ mb: 3 }}
        localization={{
          actions: "",
        }}
        C
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex" }}>
            <Tooltip arrow placement="top" title="Preview">
              <Button
                sx={{ textTransform: "none" }}
                size="small"
                variant="outlined"
                startIcon={<PreviewIcon />}
                onClick={() => {
                  console.log(row);
                  setShowHistory(true);
                  console.log(row.id);
                  setSelectedIndex(row.id);
                }}
              >
                Preview
              </Button>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            // onClick={() => {}}
            size="small"
            variant="contained"
            startIcon={<FileDownloadIcon />}
          >
            Export
          </Button>
        )}
      />

      <HistoryModal
        open={showHistory}
        text={"View More"}
        handleClose={handleClose}
        historyData={historyData}
        i={selectedIndex}
      ></HistoryModal>
    </>
  );
}
