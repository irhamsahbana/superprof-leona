import React, { useState, useMemo, useEffect, useCallback } from "react";
// third-party
import { useNavigate } from "react-router-dom";
// components, data, slices
import MaterialReactTable from "material-react-table";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ExpressService from "../../services/ExpressService";
import CreateDialog from "../../components/CreateDialog";

import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Tooltip,
  Button,
  Chip,
  TextField,
} from "@mui/material";
import MainService from "../../services/MainService";
import TableContentLoader from "../../components/TableContentLoader";
import toast, { Toaster } from "react-hot-toast";
import AutorenewIcon from "@mui/icons-material/Autorenew";

export default function JadwalOperasi() {
  const navigate = useNavigate();
  const [jadwalList, setJadwalList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // list doctor, list room, list patient

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs().format());

  const statusKehadiran = [
    { id: 1, status: "Belum datang" },
    { id: 2, status: "Datang" },
    { id: 3, status: "Cancelled" },
  ];

  // fetch all lists here
  // useEffect(() => {
  //   ExpressService.getAll(
  //     "v1/api/operation-schedule?filterByDate=2022-12-30T19:37:03.611Z"
  //   ).then((res) => {
  //     setJadwalList(res);
  //     console.log(jadwalList.length);
  //   });
  //   setIsLoading(false);
  // }, [jadwalList.length]);

  useEffect(() => {
    getScheduleByDate();
  }, [selectedDate]);

  const getScheduleByDate = () => {
    ExpressService.getAll(
      `v1/api/operation-schedule?filterByDate=${selectedDate}`
    ).then((res) => {
      setJadwalList(res);
      console.log(jadwalList.length);
    });
  };
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
        accessorKey: "patientName",
      },
      {
        header: "Dokter yang menangani",
        accessorKey: "doctor",
      },
      {
        header: "Keterangan",
        accessorKey: "notes",
      },
      {
        header: "Waktu",
        accessorKey: "time",
        // accessorFn: (row) => `${row.startTime} - ${row.endTime}`,
      },
      {
        header: "Status",
        accessorKey: "status",
        Cell: ({ cell }) => {
          return cell.getValue() === "Belum datang" ? (
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
    ],
    []
  );

  return (
    <>
      <div className="mb-5">
        <h1>
          Jadwal Operasional{" "}
          {/* <span className="text-blue-500 text-2xl">Jadwal Operasional</span> */}
        </h1>
      </div>

      <form
        onSubmit={(e, newValue) => {
          e.preventDefault();
          setSelectedDate(dayjs(newValue).format("DD/MM/YYYY"));
          console.log(newValue);
          console.log(selectedDate);
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", mb: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              inputFormat="DD/MM/YYYY"
              value={selectedDate}
              size="small"
              name="date"
              onChange={(newValue) => {
                setSelectedDate(dayjs(newValue));
                console.log(newValue);
                console.log(selectedDate);
              }}
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
          <div className="flex">
            <Button
              type="submit"
              sx={{ ml: 1, mt: 0.5, mb: 0.5 }}
              // onClick={() => {}}
              size="small"
              variant="contained"
            >
              Tampilkan
            </Button>
          </div>
        </Box>
      </form>

      {isLoading ? (
        <TableContentLoader />
      ) : (
        <MaterialReactTable
          columns={cols}
          data={jadwalList}
          localization={{
            actions: "",
          }}
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex" }}>
              <Tooltip arrow placement="left" title="Ubah Status">
                <IconButton
                  onClick={() => {
                    setShowStatusModal(true);
                  }}
                  color="primary"
                >
                  <AutorenewIcon />
                </IconButton>
              </Tooltip>
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
      <CreateDialog
        open={showStatusModal}
        handleClose={() => setShowStatusModal(false)}
        title="Ubah Status Kehadiran"
      >
        <div>
          <select
            // onChange={(e) => dispatch(setStatusJadwal(e.target.value))}
            className="bg-gray-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-sky-500 focus:border-sky-500 block w-full px-2"
          >
            {statusKehadiran.map((data, i) => (
              <option key={i} defaultValue={data.id}>
                {data.status}
              </option>
            ))}
          </select>
        </div>
      </CreateDialog>
    </>
  );
}
