import React, { useState } from "react";
import { ButtonMain } from "../../components/Button";
import Card from "../../components/Card";
import Container from "../../layouts/Container";
import TableMetodePembayaran from "../Kasir/TableMetodePembayaran";
import KasirTable from "../Kasir/KasirTable";
import { Transaksi } from "../../data/Transaksi";
import { BsCashStack } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import BaseModal from "../../layouts/BaseModal";
import FormInput from "../../components/FormInput";

export default function Pembayaran() {
  const navigate = useNavigate();
  const [showBayarModal, setShowBayarModal] = useState(false);

  const handleShowBayarModal = () => {
    setShowBayarModal(true);
  };
  
  return (
    <>
      <div className="flex flex-row justify-between mb-5">
        <h1>Kasir</h1>
        <ButtonMain
          text="Proses Invoice"
          bgColor="bg-blue-400"
          hoverColor="hover:bg-blue-500"
          onClick={() => navigate("/invoice")}
        />
      </div>

      <div className="flex flex-col lg:flex-row">
        <Container>
          <div className="flex flex-col lg:flex-row">
            <div>
              <div className="flex flex-row mb-2">
                <p className="w-44">No. Rekam Medis</p>
                <p className="mx-3">:</p>
                <p className="w-max font-semibold">J-22090138</p>
              </div>
              <div className="flex flex-row mb-2">
                <p className="w-44 ">Nama Pasien</p>
                <p className="mx-3">:</p>
                <p className="w-max font-semibold">Japa Jan</p>
              </div>
              <div className="flex flex-row mb-2">
                <p className="w-44">No. HP</p>
                <p className="mx-3">:</p>
                <p className="w-max font-semibold">821-1989-9911</p>
              </div>
              <div className="flex flex-row mb-2">
                <p className="w-44">Alamat</p>
                <p className="mx-3">:</p>
                <p className="w-max font-semibold">
                  Jl. Perum Bhuana Permai Padangsambian
                </p>
              </div>
              <div className="flex flex-row mb-2">
                <p className="w-44">Tanggal Lahir</p>
                <p className="mx-3">:</p>
                <p className="w-max font-semibold">19 Oktober 2000</p>
              </div>
            </div>
            <div className="ml-3 mt-3 md:ml-12 lg:ml-12 flex float-right">
              <Card width="w-full" height="h-max" bgColor="bg-green-300">
                <div className="flex flex-row">
                  <span className="text-2xl h-auto pt-10 pl-2">
                    <BsCashStack />
                  </span>
                  <div className="flex flex-col p-8">
                    <div className="flex flex-row">
                      <p>Saldo Deposit:</p>
                      <p className="ml-3 font-bold">Rp. 10.000.000</p>
                    </div>
                    <p className="text-sm mt-1">
                      Untuk deposit 50% pemasangan KLAR
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>

        {/* <div className="flex flex-col ml-4">
          <p className="font-bold text-xl mt-6 mb-2">Metode Pembayaran:</p> */}
        <div className="mr-10 sm:mt-8"></div>
        <Container>
          <div className="flex flex-row justify-between">
            <p className="font-bold text-xl mt-6 mb-2 ml-4">Pembayaran</p>
            <div className="mt-3">
              <ButtonMain
                bgColor="bg-blue-400"
                hoverColor="hover:bg-blue-500"
                text="Tambah"
                onClick={handleShowBayarModal}
              />
            </div>
          </div>
          <TableMetodePembayaran />
        </Container>
      </div>
      {/* </div> */}

      <div className="mt-3">
        {/* <div className="flex flex-row">
          <div className="mr-3"></div> */}
        <div>
          <p className="font-bold text-xl mt-6 mb-2">Detail Invoice:</p>
          <Container>
            <div className="mb-3"></div>
            <KasirTable transaksi={Transaksi} />
            <div className="flex flex-row justify-between">
              <div></div>
              <div className="pr-2 pb-2">
                <div className="flex flex-row mb-2 mt-8">
                  <p className="w-44">Grand Total</p>
                  <p className="mx-3">:</p>
                  <p className="w-max font-semibold">Rp. 2.000.000</p>
                </div>
                <div className="flex flex-row mb-2">
                  <p className="w-44 ">Total Bayar</p>
                  <p className="mx-3">:</p>
                  <p className="w-max font-semibold">Rp. 2.000.000</p>
                </div>
                <div className="flex flex-row mb-2">
                  <p className="w-44 ">Kembalian</p>
                  <p className="mx-3">:</p>
                  <p className="w-max font-semibold">Rp. 0</p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {showBayarModal && (
        <BaseModal
          text="Simpan"
          handleClose={() => setShowBayarModal(false)}
          onClick={() => setShowBayarModal(false)}
        >
          <h1 className="text-center pb-4">Proses Pembayaran</h1>
          <div className="my-4 w-full">
            <FormInput
              text="Metode Pembayaran"
              name="metode"
              // value={selectedData[selected]}
              // onChange={handleChange}
            />
            <div className="h-5"></div>
            <FormInput
              text="Nominal"
              name="nominal"
              // value={selectedData[selected]}
              // onChange={handleChange}
            />
          </div>
        </BaseModal>
      )}
    </>
  );
}
