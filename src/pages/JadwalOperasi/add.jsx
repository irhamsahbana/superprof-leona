import React, { useState } from "react";
// third-party
import { useSelector } from "react-redux";
import { BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// data
import { Studio } from "../../data/Studio";
import { Dokter } from "../../data/Dokter";
// service
import JadwalService from "../../services/JadwalService";
// components
import Container from "../../layouts/Container";
import { ButtonMain, ButtonIcon } from "../../components/Button";
import FormInput from "../../components/FormInput";

export default function AddJadwal() {
  const navigate = useNavigate();
  const initForm = {
    id: null,
    patient: {},
    notes: null,
    doctor: {},
    room: {},
    date: null,
    start: null,
    end: null,
  };

  // data to-be added
  const [tempData, setTempData] = useState([initForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // tempData.map(async (val) => {
    //   await JadwalService.addData(val);
    // });
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
      <div id="header-container" className="flex flex-row justify-between">
        <div id="header-left" className="flex flex-col mb-4">
          <h1>
            Jadwal Operasi:{" "}
            <span className="text-blue-400 text-2xl">Input</span>
          </h1>
        </div>
        <div>
          {/* add data button */}
          <div className="float-right mb-3">
            <ButtonMain
              onClick={handleSubmit}
              bgColor="bg-blue-400"
              hoverColor="hover:bg-blue-500"
              text="Save Changes"
              type="submit"
            />
          </div>
        </div>
      </div>

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
                <select className="bg-gray-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-max px-2">
                  {Studio.map((data, i) => (
                    <option key={i} defaultValue={data}>
                      {data}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select className="bg-gray-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-max px-2">
                  {Dokter.map((data, i) => (
                    <option key={i} defaultValue={data.nama}>
                      {data.nama}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* <FormInput
          name="tanggal"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        /> */}
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
                      <FormInput
                        placeholder="Name Pasien"
                        name={`nama`}
                        onChange={(e) => handleChange(idx, e)}
                      />
                    </td>
                    <td className="w-3/12">
                      <FormInput
                        width="w-full"
                        placeholder="Keterangan"
                        name={`keterangan`}
                        onChange={(e) => handleChange(idx, e)}
                      />
                    </td>
                    <td className="w-1/12">
                      <tr>
                        <td className="w-1/3">
                          <FormInput
                            placeholder="Waktu Mulai Operasi"
                            name={`start`}
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
                            name={`end`}
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
