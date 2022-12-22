import React, { useState, useMemo, useEffect, useCallback } from "react";
// third-party
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
// components, data, slices
import MaterialReactTable from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import { ButtonIcon, ButtonAdd } from "../../../components/Button";
import MainService from "../../../services/MainService";
import TableContentLoader from "../../../components/TableContentLoader";
import toast, { Toaster } from "react-hot-toast";

export default function ViewStudio() {
  const navigate = useNavigate();

  const [studioList, setStudioList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const ENDPOINT = "studios";

  useEffect(() => {
    MainService.getAll(ENDPOINT).then((res) => {
      setStudioList(res);
      // setstudioListList(res);
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
    //send/receive api updates here, then refetch or update local table data for re-render
    MainService.updateData(ENDPOINT, row.original.id, values);
    setStudioList([...studioList, values]);
    toast.success("Data telah berhasil diubah!", {
      duration: 2000,
      position: "top-right",
    });
    exitEditingMode(); //required to exit editing mode and close modal
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
      <div className="flex flex-row h-8">
        <ButtonAdd onClick={() => navigate("/studioList/add")} />
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
        />
      )}
      <Toaster />
    </>
  );
}
