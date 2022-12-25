import React, { useState, useMemo, useEffect, useCallback } from "react";
// third-party
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
// components, data, slices
import MaterialReactTable from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Button } from "@mui/material";
import { ButtonIcon, ButtonAdd } from "../../../components/Button";
import MainService from "../../../services/MainService";
import TableContentLoader from "../../../components/TableContentLoader";
import toast, { Toaster } from "react-hot-toast";
import { formatRupiah } from "../../../utils/misc";
import { TambahDataModal } from "./addModal";

export default function ViewTindakan() {
  const navigate = useNavigate();

  const [tindakanList, setTindakanList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const ENDPOINT = "treatments?_expand=category";

  useEffect(() => {
    MainService.getAll(ENDPOINT).then((res) => {
      setTindakanList(res);
      console.log(tindakanList.length);
    });
    setIsLoading(false);
  }, [tindakanList.length]);

  const handleCloseDelete = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        alert(`Are you sure you want to delete ${row.getValue("tindakan")}`)
      ) {
        return;
      }
      console.log(row);
      try {
        MainService.removeData("treatments", row.original.id).then((res) => {
          toast.success("Jadwal berhasil dihapus!", {
            duration: 4000,
            position: "top-right",
          });
          setTindakanList([...tindakanList]);
        });
      } catch {
        toast.error("Jadwal tidak dapat dihapus!", {
          duration: 4000,
          position: "top-right",
        });
      }
    },
    [tindakanList]
  );

  const handleCreateData = (values) => {
    // tindakanList.push(values);
    // setTableData([...tableData]);
    try {
      MainService.addData("treatments", values).then((res) => {
        console.log(res);
        toast.success("Data telah berhasil ditambah!", {
          duration: 2000,
          position: "top-right",
        });
      });
    } catch {
      console.log("error");
    }
    setTindakanList([...tindakanList]);

    console.log(values);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    console.log(row.index);
    console.log(values);
    //send/receive api updates here, then refetch or update local table data for re-render
    MainService.updateData("treatments", row.original.id, values);
    setTindakanList([...tindakanList, values]);
    toast.success("Data telah berhasil diubah!", {
      duration: 2000,
      position: "top-right",
    });
    exitEditingMode(); //required to exit editing mode and close modal
  };

  const cols = useMemo(
    () => [
      {
        header: "Tindakan",
        accessorKey: "tindakan",
      },
      {
        header: "Biaya",
        accessorKey: "biaya",
        Cell: ({ cell }) => <span>{formatRupiah(cell.getValue())}</span>,
      },
      {
        header: "Jenis Tindakan",
        accessorKey: "category.nama",
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
        <ButtonAdd onClick={() => navigate("/tindakanList/add")} />
      </div>
      {isLoading ? (
        <TableContentLoader />
      ) : (
        <MaterialReactTable
          columns={cols}
          data={tindakanList}
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
      <Toaster />
      <TambahDataModal
        columns={cols}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
       />
    </>
  );
}
