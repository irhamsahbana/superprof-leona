import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "../../../components/FormInput";
import { ButtonMain, ButtonIcon, ButtonBack } from "../../../components/Button";
import { BsFillTrashFill } from "react-icons/bs";
import DokterService from "../../../services/DokterService";
import { useNavigate } from "react-router-dom";
import Container from "../../../layouts/Container";
import toast, { Toaster } from "react-hot-toast";

export default function AddDokter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { dokter } = useSelector((state) => state.dokter);

  const initialForm = {
    id: null,
    nama: "",
    spesialis: "",
  };
  const [tempNewData, setTempNewData] = useState([initialForm]);

  const handleAddRow = () => {
    let newRow = { id: null, nama: "", spesialis: "" };
    setTempNewData([...tempNewData, newRow]);
  };

  const handleChange = (i, e) => {
    let copyTemp = [...tempNewData];
    console.log(copyTemp);
    copyTemp[i][e.target.name] = e.target.value;
    setTempNewData(copyTemp);
    console.log(tempNewData);
  };

  const handleRemove = (i) => {
    const dataRow = [...tempNewData];
    dataRow.splice(i, 1);
    setTempNewData(dataRow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // demo purposes
    if (tempNewData[0].nama === "" || tempNewData[0].spesialis === "") {
      toast.error("Harap isi dengan data", {
        duration: 2000,
        position: "top-right",
      });
    } else {
      try {
        tempNewData.map(async (val) => {
          await DokterService.addData(val);
          toast.success("Data telah berhasil ditambah!", {
            duration: 2000,
            position: "top-right",
          });
        });
        navigate("/dokter");
      } catch {
        console.error("err");
      }
    }
  };

  return (
    <div>
      <div id="header-container" className="flex flex-row justify-between">
        <div id="header-left" className="flex flex-col mb-4">
          <ButtonBack />
          <h1>
            Dokter:{" "}
            <span className="text-blue-400 font-bold text-2xl">Input Baru</span>
          </h1>
        </div>
        <div>
          <ButtonMain
            bgColor="bg-blue-400"
            hoverColor="hover:bg-blue-500"
            text="Save Changes"
            onClick={handleSubmit}
          />
        </div>
      </div>

      {/* input table form */}
      <form onSubmit={handleSubmit}>
        <Container>
          <table className="table-auto w-full mt-4">
            <thead className="px-6 py-3 text-left font-bold text-gray-900 text-xl">
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Spesialis</th>
              </tr>
            </thead>

            <tbody>
              {tempNewData.map((val, i) => (
                <tr
                  key={i}
                  className="pt-8 border-b-[1px] h-16 border-b-gray-100"
                >
                  <td className="font-bold w-1/12 pr-4 text-gray-500">
                    {i + 1}
                  </td>
                  <td className="w-3/12">
                    <FormInput
                      placeholder="Name Lengkap"
                      name="nama"
                      onChange={(e) => handleChange(i, e)}
                    />
                  </td>
                  <td className="w-3/12">
                    <FormInput
                      placeholder="Spesialis"
                      name="spesialis"
                      onChange={(e) => handleChange(i, e)}
                    />
                  </td>

                  <td>
                    {tempNewData.length !== 1 && (
                      <div className="w-1/12">
                        <ButtonIcon
                          bgColor="bg-red-400"
                          hoverColor="hover:bg-red-500"
                          onClick={() => handleRemove(i)}
                          icon={<BsFillTrashFill />}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>

        {/* add data button */}
        <div>
          <div id="bottom-button-area" className="float-right mt-10">
            <button
              onClick={handleAddRow}
              className="text-blue-400 hover:text-blue-500 hover:bg-blue-50 border border-blue-400 text-sm py-1 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transition-none disabled:transform-none"
            >
              + Tambah Data
            </button>
          </div>
        </div>
      </form>
      <Toaster />
    </div>
  );
}
