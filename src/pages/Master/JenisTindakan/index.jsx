import React, { useState, useMemo, useEffect, useCallback } from "react";
// components, data, slices
import MaterialReactTable from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Button } from "@mui/material";
import MainService from "../../../services/MainService";
import TableContentLoader from "../../../components/TableContentLoader";
import toast, { Toaster } from "react-hot-toast";
import { TambahDataModal } from "./addModal";

export default function ViewJenisTindakan() {
  const [jenisTindakanList, setJenisTindakanList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    MainService.getAll("categories").then((res) => {
      setJenisTindakanList(res);
      console.log(jenisTindakanList.length);
    });
    setIsLoading(false);
  }, [jenisTindakanList.length]);

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        alert(`Are you sure you want to delete ${row.getValue("nama")}`)
      ) {
        return;
      }
      console.log(row);
      MainService.removeData("categories", row.original.id);
      setJenisTindakanList([...jenisTindakanList]);
      toast.success("Data berhasil dihapus!", {
        duration: 4000,
        position: "top-right",
      });
    },
    [jenisTindakanList]
  );

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    console.log(row.index);
    console.log(values);
    MainService.updateData("categories", row.original.id, values);
    setJenisTindakanList([...jenisTindakanList, values]);
    toast.success("Data telah berhasil diubah!", {
      duration: 2000,
      position: "top-right",
    });
    exitEditingMode(); 
  };

  const handleCreateData = (values) => {
    try {
      MainService.addData("categories", values).then((res) => {
        console.log(res);
        toast.success("Data telah berhasil ditambah!", {
          duration: 2000,
          position: "top-right",
        });
      });
    } catch {
      console.log("error");
    }
    setJenisTindakanList([...jenisTindakanList, values]);
    console.log(values);
  };

  const cols = useMemo(
    () => [
      {
        header: "Jenis Tindakan",
        accessorKey: "nama",
      },
    ],
    []
  );

  return (
    <>
      <div className="mb-5">
        <h1>
          Master Data:{" "}
          <span className="text-blue-500 text-2xl">Jenis Tindakan</span>
        </h1>
      </div>
      {isLoading ? (
        <TableContentLoader />
      ) : (
        <MaterialReactTable
          columns={cols}
          data={jenisTindakanList}
          localization={{
            actions: "",
          }}
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex" }}>
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
