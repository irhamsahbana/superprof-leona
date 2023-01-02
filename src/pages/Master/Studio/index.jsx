import React, { useState, useMemo, useEffect, useCallback } from "react";
// third-party
import { useNavigate } from "react-router-dom";
// components, data, slices
import MaterialReactTable from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Button } from "@mui/material";
import MainService from "../../../services/MainService";
import TableContentLoader from "../../../components/TableContentLoader";
import toast, { Toaster } from "react-hot-toast";
import { TambahDataModal } from "./addModal";


export default function ViewStudio() {
  const [studioList, setStudioList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const ENDPOINT = "studios";

  useEffect(() => {
    MainService.getAll(ENDPOINT).then((res) => {
      setStudioList(res);
      console.log(studioList.length);
    });
    setIsLoading(false);
  }, [studioList.length]);

  const handleCloseDelete = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (alert(`Are you sure you want to delete ${row.getValue("studio")}`)) {
        return;
      }
      console.log(row);
      MainService.removeData(ENDPOINT, row.original.id);
      setStudioList([...studioList]);
      toast.success("Jadwal berhasil dihapus!", {
        duration: 4000,
        position: "top-right",
      });
    },
    [studioList]
  );

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    console.log(row.index);
    console.log(values);
    MainService.updateData(ENDPOINT, row.original.id, values);
    setStudioList([...studioList, values]);
    toast.success("Data telah berhasil diubah!", {
      duration: 2000,
      position: "top-right",
    });
    exitEditingMode(); //required to exit editing mode and close modal
  };

  const handleCreateData = (values) => {
    try {
      MainService.addData("studios", values).then((res) => {
        console.log(res);
        toast.success("Data telah berhasil ditambah!", {
          duration: 2000,
          position: "top-right",
        });
      });
    } catch {
      console.log("error");
    }
    setStudioList([...studioList, values]);

    console.log(values);
  };


  const cols = useMemo(
    () => [
      {
        header: "Studio",
        accessorKey: "studio",
      },
    ],
    []
  );

  return (
    <>
      <div className="mb-5">
        <h1>
          Master Data: <span className="text-blue-500 text-2xl">Studio</span>
        </h1>
      </div>
      {isLoading ? (
        <TableContentLoader />
      ) : (
        <MaterialReactTable
          columns={cols}
          data={studioList}
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex"}}>
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
