import React, { useState } from "react";
// components
import { ButtonBack } from "../../components/Button";
import FormInput from "../../components/FormInput";
// layouts
import Container from "../../layouts/Container";
import BaseModal from "../../layouts/BaseModal";
// kasir-related
import TableMetodePembayaran from "./TableMetodePembayaran";
import KasirTable from "../Kasir/KasirTable";
import { Transaksi } from "../Kasir/DummyTransaksi";
// third-party
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import { Button, Tooltip, IconButton } from "@mui/material";

export default function Pembayaran() {
  const navigate = useNavigate();
  const [showBayarModal, setShowBayarModal] = useState(false);

  const handleShowBayarModal = () => {
    setShowBayarModal(true);
  };

  return (
    <>
      <ButtonBack />
      <div className="flex flex-row justify-between mb-3">
        <h1>Kasir</h1>

        <Button
          sx={{ textTransform: "none" }}
          onClick={() => navigate("/invoice")}
          size="small"
          variant="contained"
          startIcon={<SaveIcon />}
        >
          Simpan Pembayaran
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row">
        <Container>
          <div className="flex flex-col lg:flex-row py-2">
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
          </div>
        </Container>

        <div className="mr-10 sm:mt-8"></div>
        <Container>
          <div className="flex flex-row justify-between">
            <p className="font-bold text-lg mt-1 mb-2 ml-4">Pembayaran</p>
            <div className="mt-2 mr-3">
              <Tooltip arrow placement="right" title="Tambah">
                <IconButton
                  onClick={handleShowBayarModal}
                  sx={{
                    backgroundColor: "#60a5fa",
                    color: "white",
                    padding: 0,
                    ":hover": {
                      bgcolor: "#3b82f6",
                      color: "white",
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <TableMetodePembayaran />
        </Container>
      </div>
      {/* </div> */}

      <div className="mt-3">
        <div>
          <p className="font-bold text-lg mt-6 mb-2">Detail Invoice:</p>
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
          <div className="mt-12"></div>
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
