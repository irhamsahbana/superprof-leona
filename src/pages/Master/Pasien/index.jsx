import React, { useState, useMemo, useEffect, useCallback } from "react";
// components, data, slices
import MaterialReactTable from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Button } from "@mui/material";
import MainService from "../../../services/MainService";
import TableContentLoader from "../../../components/TableContentLoader";
import toast, { Toaster } from "react-hot-toast";
import { TambahDataModal } from "./addModal";

export default function ViewPasien() {
  const [pasienList, setPasienList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    MainService.getAll("patients").then((res) => {
      setPasienList(res);
      console.log(pasienList.length);
    });
    setIsLoading(false);
  }, [pasienList.length]);

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        alert(`Are you sure you want to delete ${row.getValue("full_name")}`)
      ) {
        return;
      }
      console.log(row);
      MainService.removeData("patients", row.original.id);
      setPasienList([...pasienList]);
      toast.success("Data berhasil dihapus!", {
        duration: 4000,
        position: "top-right",
      });
    },
    [pasienList]
  );

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    console.log(row.index);
    console.log(values);
    MainService.updateData("patients", row.original.id, values);
    setPasienList([...pasienList, values]);
    toast.success("Data telah berhasil diubah!", {
      duration: 2000,
      position: "top-right",
    });
    exitEditingMode(); //required to exit editing mode and close modal
  };

  const handleCreateData = (values) => {
    try {
      MainService.addData("patients", values).then((res) => {
        console.log(res);
        toast.success("Data telah berhasil ditambah!", {
          duration: 2000,
          position: "top-right",
        });
      });
    } catch {
      console.log("error");
    }
    setPasienList([...pasienList, values]);

    console.log(values);
  };

  const cols = useMemo(
    () => [
      {
        header: "Nama Pasien",
        accessorKey: "full_name",
      },
      {
        header: "Alamat",
        accessorKey: "address",
      },
      {
        header: "Tanggal Lahir",
        accessorKey: "dob",
      },
      {
        header: "No. Telpon",
        accessorKey: "phone",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
    ],
    []
  );

  return (
    <>
      <div className="mb-5">
        <h1>
          Master Data: <span className="text-blue-500 text-2xl">Pasien</span>
        </h1>
      </div>
      {isLoading ? (
        <TableContentLoader />
      ) : (
        <MaterialReactTable
          columns={cols}
          data={pasienList}
          initialState={{ columnVisibility: { dob: false, email: false } }}
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
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Tambah Data
            </Button>
          )}
        />
      )}

      <TambahDataModal
        columns={cols}
        open={createModalOpen}
        onSubmit={handleCreateData}
        onClose={() => setCreateModalOpen(false)}
      />
      <Toaster />
    </>
  );
}
