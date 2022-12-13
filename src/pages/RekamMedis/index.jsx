import React from "react";
import FormInput from "../../components/FormInput";
import { ButtonMain } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Search from "../../assets/search.svg";

export default function RekamMedis() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/rekam-medis/search");
  };
  return (
    <>
      <div className="mb-5">
        <h1>Rekam Medis</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-8/12 flex flex-row">
          <FormInput type="text" placeholder="Nama/ No. RM pasien" />
          <ButtonMain
            bgColor="bg-blue-500 px-3"
            text="Tampilkan"
            hoverColor="hover:bg-blue-600"
          ></ButtonMain>
        </div>
      </form>
      <div className="pl-50 ml-[500px] mt-40">
        <img className="w-40 h-auto" alt="Search" src={Search} />
        <p className="pt-3">Belum ada rekam medis yang dicari</p>
      </div>
    </>
  );
}
