import React, { useState, useMemo, useEffect } from "react";
// third-party
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DatePicker, Tag } from "antd";
import dayjs from "dayjs";
// components, data, slices
import MaterialReactTable from "material-react-table";
import { Box, Button, IconButton, Tooltip, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PaymentsIcon from "@mui/icons-material/Payments";
import ExportToExcel from "../../components/ExportToExcel";
import DummyKasir from "../../data/DummyKasir.json";

export default function Kasir() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dateFormat = "DD/MM/YYYY";

  const cols = useMemo(() =>  [
    {
      Header: "Nama",
      accessorKey: "nama",
    },
    {
      Header: "Status",
      accessorKey: "status",
      Cell: ({ cell }) => {
        return cell.getValue() === "Belum Lunas" ? (
          <Chip
            size="small"
            variant="outlined"
            color="error"
            label={cell.getValue()}
          />
        ) : (
          <Chip
            size="small"
            variant="outlined"
            color="success"
            label={cell.getValue()}
          />
        );
      },
    },
  ], [])

  const data = useMemo(() => DummyKasir, []);

  return (
    <>
      <div className="mb-5">
        <h1>Kasir</h1>
      </div>
      <div className="flex flex-row">
        <div className="mr-3">
          <DatePicker
            defaultValue={dayjs("12/12/2022", dateFormat)}
            format={dateFormat}
          />
        </div>

        <div>
          <ExportToExcel excelData={data} fileName="LaporanTransaksi20092022" />
        </div>
      </div>
      <div className="mt-4">
        <MaterialReactTable
          columns={cols}
          data={DummyKasir}
          enableEditing
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex" }}>
              <Tooltip arrow placement="left" title="Proses Pembayaran">
                <span className="mt-1">
                  <IconButton
                    color="primary"
                    onClick={() => navigate("/proses-invoice")}
                  >
                    <PaymentsIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip arrow placement="right" title="Edit Transaksi">
                <IconButton onClick={() => navigate("/ubah-invoice")}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />
      </div>
    </>
  );
}
