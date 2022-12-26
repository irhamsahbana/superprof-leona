import React, { useState, useMemo, useEffect, useCallback } from "react";
// third-party
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
// components, data, slices
import MaterialReactTable from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";

import { ButtonIcon, ButtonAdd } from "../../../components/Button";
import EditDokter from "./edit";
import DokterService from "../../../services/DokterService";
import DeleteModal from "../../../components/DeleteModal";
import TableContentLoader from "../../../components/TableContentLoader";
import toast, { Toaster } from "react-hot-toast";
import {
  setDokter,
  setSelectedData,
  setLoading,
  setValidate,
} from "../../../redux/dokterSlice";

export default function ViewDokter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dokter, loading, validate } = useSelector((state) => state.dokter);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  useEffect(() => {
    DokterService.getAll().then((res) => {
      dispatch(setDokter(res));
      // setDokterList(res);
      console.log(dokter.length);
    });
    dispatch(setLoading(false));
  }, [dokter.length]);

  useEffect(() => {
    showToaster();
  }, [dokter]);

  const handleCloseDelete = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (alert(`Are you sure you want to delete ${row.getValue("nama")}`)) {
        return;
      }
      console.log(row);
      DokterService.removeData(row.original.id);
      dispatch(setDokter([...dokter]));
      toast.success("Jadwal berhasil dihapus!", {
        duration: 4000,
        position: "top-right",
      });
    },
    [dokter]
  );

  const handleSaveRowEdits = 
    async ({ exitEditingMode, row, values }) => {
      console.log(row.index);
      console.log(values);
      DokterService.updateData(row.original.id, values);
      dispatch(setDokter([...dokter, values]));
      exitEditingMode();
    };


  const showToaster = () => {
    validate.specific.edit &&
      toast.success("Data telah berhasil diubah!", {
        duration: 2000,
        position: "top-right",
      });
  };

  const cols = useMemo(
    () => [
      {
        header: "Nama",
        accessorKey: "nama",
      },
      {
        header: "Spesialis",
        accessorKey: "spesialis",
      }
    ],
    []
  );

  return (
    <>
      <div className="mb-5">
        <h1>
          Master Data: <span className="text-blue-500 text-2xl">Dokter</span>
        </h1>
      </div>
      <div className="flex flex-row h-8">
        <ButtonAdd onClick={() => navigate("/dokter/add")} />
      </div>
      {loading ? (
        <TableContentLoader />
      ) : (
        // <Table columns={columns} data={data} />
        <MaterialReactTable
          columns={cols}
          data={dokter}
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => {table.setEditingRow(row); console.log(row)}}>
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
              onClick={() => console.log("he")}
              variant="contained"
            >
              Tambah Data
            </Button>
          )}
        />
      )}

      {/* 
      {showDeleteModal && (
        <DeleteModal
          handleClose={handleCloseDelete}
          handleDelete={() => handleDelete(index)}
        />
      )} */}

      <Toaster />
    </>
  );
}
