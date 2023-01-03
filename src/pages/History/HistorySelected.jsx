import React, { useState, useMemo } from "react";
import { ButtonBack } from "../../components/Button";
import ExportToExcel from "../../components/ExportToExcel";
import HistoryModal from "./HistoryModal";
import DummySelectedHistory from "./DummySelectedHistory.json";
import MaterialReactTable from "material-react-table";
import { Box, Button, Tooltip, TextField } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function HistorySelected() {
  const [showHistory, setShowHistory] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selectedHistory = DummySelectedHistory;

  const handleClose = () => {
    setShowHistory(false);
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
      <div className="mb-5">
        <ButtonBack />
        <h1>
          Data Transaksi:{" "}
          <span className="text-blue-500 text-2xl">Jessica Josephine</span>
        </h1>
        <p className="pt-1 text-lg">Semua transaksi pasien</p>
      </div>

      <MaterialReactTable
        columns={cols}
        data={selectedHistory}
        enableRowSelection
        localization={{
          actions: "",
        }}
        enableEditing
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
                  setSelectedIndex(row.id);
                }}
              >
                Preview
              </Button>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={({ table }) => (
          <Box
            sx={{ display: "flex", gap: "1rem", p: "0.5rem", flexWrap: "wrap" }}
          >
            <Button
              color="primary"
              //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
              // onClick={handleExportData}
              startIcon={<FileDownloadIcon />}
              variant="contained"
            >
              Export All Data
            </Button>

            <Button
              disabled={
                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
              }
              // only export selected rows
              onClick={() => console.log(table.getSelectedRowModel().rows)}
              startIcon={<FileDownloadIcon />}
              variant="contained"
            >
              Export Selected Rows
            </Button>
          </Box>
        )}
      />
      {/* TODO error here */}
      {/* <HistoryModal
        open={showHistory}
        handleClose={handleClose}
        historyData={selectedHistory}
        i={selectedIndex}
      /> */}
    </>
  );
}
