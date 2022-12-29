import React, { useState, useMemo, useEffect, useCallback } from "react";
// third-party
import { useNavigate } from "react-router-dom";
// components, data, slices
import MaterialReactTable from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Button } from "@mui/material";
import MainService from "../../services/MainService";
import TableContentLoader from "../../components/TableContentLoader";
import toast, { Toaster } from "react-hot-toast";

export default function JadwalOperasi() {
  const navigate = useNavigate();
  const [jadwalList, setJadwalList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // list doctor, list room, list patient

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // fetch all lists here
  useEffect(() => {
    MainService.getAll("schedules").then((res) => {
      setJadwalList(res);
      console.log(jadwalList.length);
    });
    setIsLoading(false);
  }, [jadwalList.length]);

  const handleCloseDelete = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (alert(`Are you sure you want to delete ${row.getValue("jadwal")}`)) {
        return;
      }
      console.log(row);
      MainService.removeData("schedules", row.original.id);
      setJadwalList([...jadwalList]);
      toast.success("Jadwal berhasil dihapus!", {
        duration: 4000,
        position: "top-right",
      });
    },
    [jadwalList]
  );

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    console.log(row.index);
    console.log(values);
    MainService.updateData("schedules", row.original.id, values);
    setJadwalList([...jadwalList, values]);
    toast.success("Data telah berhasil diubah!", {
      duration: 2000,
      position: "top-right",
    });
    exitEditingMode(); //required to exit editing mode and close modal
  };

  const handleCreateData = (values) => {
    try {
      MainService.addData("schedules", values).then((res) => {
        console.log(res);
        toast.success("Data telah berhasil ditambah!", {
          duration: 2000,
          position: "top-right",
        });
      });
    } catch {
      console.log("error");
    }
    setJadwalList([...jadwalList, values]);

    console.log(values);
  };

  const cols = useMemo(
    () => [
      {
        header: "Nama Pasien",
        accessorKey: "pasien",
      },
      {
        header: "Dokter yang menangani",
        accessorKey: "dokter",
      },
      {
        header: "Keterangan",
        accessorKey: "keterangan",
      },
      {
        header: "Waktu",
        accessorFn: (row) => `${row.jam_mulai} - ${row.jam_selesai}`,
      },
    ],
    []
  );

  return (
    <>
      <div className="mb-5">
        <h1>
          Master Data:{" "}
          <span className="text-blue-500 text-2xl">Jadwal Operasional</span>
        </h1>
      </div>
      {isLoading ? (
        <TableContentLoader />
      ) : (
        <MaterialReactTable
          columns={cols}
          data={jadwalList}
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton
                  onClick={() => {
                    table.setEditingRow(row);
                    console.log(row);
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Button
              color="primary"
              onClick={() => navigate("/jadwal/add")}
              variant="contained"
            >
              Buat Jadwal Baru
            </Button>
          )}
        />
      )}
      <Toaster />
    </>
  );
}
