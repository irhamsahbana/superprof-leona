import React, { useEffect, useState, useMemo } from "react";
import PreviewIcon from "@mui/icons-material/Preview";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import HistoryData from "../../data/HistoryData.json";
import HistoryModal from "./HistoryModal";
import MaterialReactTable from "material-react-table";
import { Box, Button, IconButton, Tooltip, TextField } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function History() {
  const [showHistory, setShowHistory] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const historyData = HistoryData[0].now;

  const handleClose = () => {
    setShowHistory(false);
  };

  const [value, setValue] = React.useState(dayjs().format());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const cols = useMemo(
    () => [
      {
        Header: "Nama Pasien",
        accessorKey: "nama",
      },
      {
        Header: "Tanggal",
        accessorKey: "tanggal",
      },
      {
        Header: "Dokter yang menangani",
        accessorKey: "dokter",
      },
      {
        Header: "Tindakan",
        accessorKey: "tindakan",
      },
    ],
    []
  );

  // const data = useMemo(() => historyData, []);

  return (
    <>
      <div className="mb-4">
        <h1>
          Data Transaksi:{" "}
          <span className="text-blue-500 text-2xl">History</span>
        </h1>
      </div>
      <div className="mb-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            inputFormat="DD/MM/YYYY"
            value={value}
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
      </div>
      <div className="flex mb-3">
        <Button
          sx={{ textTransform: "none", mr: 1 }}
          // onClick={() => }
          size="small"
          variant="contained"
        >
          Semua Transaksi
        </Button>
        <Button
          sx={{ textTransform: "none" }}
          // onClick={() => }
          size="small"
          variant="contained"
          startIcon={<FileDownloadIcon />}
        >
          Export
        </Button>
      </div>
      <MaterialReactTable
        columns={cols}
        data={historyData}
        enableEditing
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex" }}>
            <Tooltip arrow placement="left" title="Preview">
              <IconButton
                onClick={() => {
                  console.log(row);
                }}
                color="primary"
              >
                <PreviewIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />

      {showHistory && (
        <HistoryModal
          text={"View More"}
          handleClose={handleClose}
          historyData={historyData}
          i={selectedIndex}
        />
      )}
    </>
  );
}
