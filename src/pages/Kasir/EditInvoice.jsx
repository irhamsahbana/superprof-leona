import React, { useState } from "react";
import { ButtonMain, ButtonBack } from "../../components/Button";
import EditKasirTable from "./EditKasirTable";
import { Transaksi } from "./DummyTransaksi";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import Container from "../../layouts/Container";

export default function EditInvoice() {
  const [showEditView, setShowEditView] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <ButtonBack />

      <div id="header-container" className="flex flex-row justify-between">
        <div id="header-left" className="flex flex-col mb-4">
          <h1>Ubah Detail Transaksi</h1>
        </div>
        <span>
          <Button
            sx={{ textTransform: "none" }}
            type="submit"
            size="small"
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Simpan
          </Button>
        </span>
      </div>
      <div className="mb-1">
        <Container>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <div>
                    Nama Pasien:{" "}
                    <span className="font-bold">Jessica Josephine</span>
                  </div>
                  <div className="mt-1">
                    Dokter: <span className="font-bold">drg. Andy</span>
                  </div>
                  <div className="mt-1">
                    Ruangan: <span className="font-bold">Studio 2</span>
                  </div>
                </div>

                <div>
                  Tanggal: <span className="font-bold">28 September 2022</span>
                </div>
              </div>
            </div>

            <div className="col-span-4 p-0">
              <hr />
            </div>

            <div className="col-span-4 mt-3">
              <EditKasirTable transaksi={Transaksi} />
            </div>

            <div className="col-span-2 mt-2">
              <div className="pr-4">
                <label className="block mb-1 text-gray-900 font-bold">
                  Keterangan
                </label>
                <div>
                  <textarea
                    type="text"
                    className="w-full h-fit bg-white border border-gray-300 text-gray-900 rounded-lg block py-2 px-3"
                    value="Jadwal kontrol 3 minggu lagi; BY"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2 mt-6">
              <div className="flex flex-row justify-between">
                Subtotal <span className="font-bold">Rp.2.000.000</span>
              </div>  
              <div className="flex flex-row justify-between">
                Diskon <span className="font-bold">Rp.20.000</span>
              </div>
              <div className="flex flex-row justify-between">
                Grand Total <span className="font-bold">Rp.1.080.000</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
