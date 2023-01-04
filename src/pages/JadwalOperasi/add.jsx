import React, { useEffect, useState } from "react";
// third-party
import { useSelector } from "react-redux";
import { BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// service
import MainService from "../../services/MainService";
import ExpressService from "../../services/ExpressService";
// components
import Container from "../../layouts/Container";
import { ButtonMain, ButtonIcon, ButtonBack } from "../../components/Button";
import FormInput from "../../components/FormInput";
import {
  TextField,
  Box,
  Button,
  MenuItem,
  Select,
  Autocomplete,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export default function AddJadwal() {
  const navigate = useNavigate();
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedStudioId, setSelectedStudioId] = useState(0);
  const [selectedPatientId, setSelectedPatientId] = useState("");

  const [selectedDoctorName, setSelectedDoctorName] = useState("");
  const [selectedPatientName, setSelectedPatientName] = useState("");

  const [selectedDate, setSelectedDate] = useState(dayjs().format());

  // useEffect(() => {
  // }, [selectedDoctorId, selectedStudioId])

  const [studioList, setStudioList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [patientList, setPatientList] = useState([]);

  const initForm = {
    patientName: selectedPatientName,
    patientId: selectedPatientId,
    note: "",
    doctor: selectedDoctorName,
    doctorId: selectedDoctorId,
    room: selectedStudioId ? studioList[selectedStudioId].studio : "",
    date: selectedDate,
    startTime: "",
    endTime: "",
  };

  // constant values
  // data to-be added
  const [tempData, setTempData] = useState([initForm]);

  useEffect(() => {
    MainService.getAll("studios").then((res) => {
      setStudioList(res);
    });

    MainService.getAll("doctors").then((res) => {
      setDoctorList(res);
    });

    MainService.getAll("patients").then((res) => {
      setPatientList(res);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    tempData.map((val) => {
      ExpressService.addData("v1/api/operation-schedule", val);
    });
    console.log(tempData);
    navigate("/jadwal");
    toast.success("Jadwal berhasil ditambah!", {
      duration: 4000,
      position: "top-right",
    });
  };

  const handleAddRow = () => {
    setTempData([...tempData, initForm]);
  };

  const handleRemove = (i) => {
    const dataRow = [...tempData];
    dataRow.splice(i, 1);
    setTempData(dataRow);
  };

  const handleChange = (i, e) => {
    let copyTemp = [...tempData];
    copyTemp[i][e.target.name] = e.target.value;
    setTempData(copyTemp);
  };

  return (
    <div>
      <ButtonBack />
      <div id="header-container" className="flex flex-row justify-between">
        <div id="header-left" className="flex flex-col mb-4">
          <h1>
            Jadwal Operasi:{" "}
            <span className="text-blue-500 text-2xl">Input</span>
          </h1>
        </div>
        <div>
          <Button
            color="primary"
            onClick={handleSubmit}
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Simpan Jadwal
          </Button>
        </div>
      </div>
      <Box sx={{ display: "flex", flexDirection: "row", mb: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            inputFormat="DD/MM/YYYY"
            value={dayjs(selectedDate)}
            size="small"
            name="date"
            onChange={(newValue) => {
              setSelectedDate(dayjs(newValue).format());
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
      </Box>
      {/* input table form */}
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="max-w-sm w-full lg:max-w-full overflow-hidden shadow-lg rounded-lg bg-indigo-200">
          <div className="px-6 pt-4 pb-4">
            <div className="flex flex-row mb-4 font-medium">
              <div className="mr-24">Ruangan : </div>
              <div className="mr-10">Dokter : </div>
            </div>
            <div className="flex flex-row">
              <div className="mr-10">
                <select
                  onChange={(e) => {
                    setSelectedStudioId(e.target.value);
                    console.log(e.target.value);
                    console.log(selectedStudioId);
                  }}
                  className="bg-gray-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-max px-2"
                >
                  {studioList.map((data, i) => (
                    <option key={i} value={data.id}>
                      {data.studio}
                    </option>
                  ))}
                </select>
                {/* <TextField
                  style={{ marginTop: 20 }}
                  label="Ruangan"
                  fullWidth
                  select
                  variant="outlined"
                  value={selectedStudioId || ""}
                  margin="dense"
                  onChange={(e) => setSelectedStudioId(e.target.value)}
                >
                  {studioList.map((option) => (
                    <MenuItem key={option.tindakan} value={option.id}>
                      {option.studio}
                    </MenuItem>
                  ))}
                </TextField> */}
              </div>
              <div className="w-56">
                <select
                  onChange={(e) => {
                    setSelectedDoctorId(e.target.value.id);
                    setSelectedDoctorName(e.target.value.nama);
                    console.log("name", selectedDoctorName);
                    console.log(e.target.value.nama);
                  }}
                  className="bg-gray-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-max px-2"
                >
                  {doctorList.map((data, i) => (
                    <option key={i} value={data}>
                      {data.nama}
                      {console.log(data)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <Container className="mt-8">
          <table className="table-auto w-full mt-4">
            <thead className="px-6 py-10 text-left font-medium text-lg text-gray-800">
              <tr className="mb-8">
                <th>No</th>
                <th>Nama Pasien</th>
                <th>Keterangan Perawatan</th>
                <th>Waktu Operasi</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {tempData.map((val, idx) => {
                return (
                  <tr
                    className="pt-8 border-b-[1px] h-16 border-b-gray-100"
                    key={idx}
                  >
                    {/* <td className="font-bold w-1/13 pr-4 text-gray-500"></td> */}
                    <td className="w-1/12">{idx + 1}</td>
                    <td className="w-2/12">
                      {/* <FormInput
                        placeholder="Name Pasien"
                        name={`nama`}
                        onChange={(e) => handleChange(idx, e)}
                      /> */}
                      <select
                        onChange={(e) => {
                          setSelectedPatientId(e.target.value.id);
                          setSelectedPatientName(e.target.value.full_name);
                          console.log(e.target.value);
                        }}
                        className="bg-gray-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-max px-2"
                      >
                        {patientList.map((data, i) => (
                          <option key={i} value={data}>
                            {data.full_name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="w-3/12">
                      <FormInput
                        width="w-full"
                        placeholder="Keterangan"
                        name={`note`}
                        onChange={(e) => handleChange(idx, e)}
                      />
                    </td>
                    <td className="w-1/12">
                      <tr>
                        <td className="w-1/3">
                          <FormInput
                            placeholder="Waktu Mulai Operasi"
                            name={`startTime`}
                            type="time"
                            onChange={(e) => handleChange(idx, e)}
                          />
                        </td>
                        <td className="w-1/3">
                          <span>-</span>
                        </td>
                        <td className="w-1/3">
                          <FormInput
                            placeholder="Waktu Selesai Operasi"
                            name={`endTime`}
                            type="time"
                            onChange={(e) => handleChange(idx, e)}
                          />
                        </td>
                      </tr>
                    </td>
                    <td className="w-2/12">
                      <ButtonIcon
                        bgColor="bg-red-400"
                        hoverColor="hover:bg-red-500"
                        onClick={() => handleRemove(idx)}
                        icon={<BsFillTrashFill />}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Container>
        <button
          onClick={handleAddRow}
          className="float-right text-blue-400 mt-4 hover:text-blue-500 bg-white hover:bg-blue-50 border border-blue-400 text-sm py-1 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transition-none disabled:transform-none"
        >
          + Tambah Data
        </button>
      </form>
    </div>
  );
}
