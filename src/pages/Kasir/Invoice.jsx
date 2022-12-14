import React, { useRef } from "react";
import KasirTable from "./KasirTable";
import { Transaksi } from "../../data/Transaksi";
import { ButtonMain } from "../../components/Button";
import Logo from "../../assets/logo-transparent.png";
import TableMetodePembayaran from "./TableMetodePembayaran";
import ReactToPrint from "react-to-print";
import Container from "../../layouts/Container";

export default function Invoice() {
  const componentRef = useRef();
  return (
    <>
      <Container>
        <div className="grid grid-cols-4 gap-4">
          <div className="  col-span-4 font-bold font-Inter text-center">
            INV-2209-0022
          </div>
          <div className="  col-span-2">
            Ruangan: <span className="font-bold">Studio 2</span>
          </div>
          <div className="  col-span-2 text-right">
            Tanggal: <span className="font-bold">28 September 2022</span>
          </div>

          <div className="col-span-4">
            <hr />
          </div>

          <div className=" ">
            <div className="pr-4">
              <label className="block mb-1 text-gray-900">Nama Pasien</label>
              <div>
                <input
                  type="text"
                  className="w-auto h-8 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block py-2 px-3"
                  value="Jessica Josephine"
                  disabled
                />
              </div>
            </div>
          </div>
          <div className=" ">
            <div className="pr-4">
              <label className="block mb-1 text-gray-900">Jenis Tindakan</label>
              <div>
                <input
                  type="text"
                  className="w-auto h-8 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block py-2 px-3"
                  value="Orthodontics"
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <KasirTable transaksi={Transaksi} />
          </div>

          <div className="col-span-2">
            <div className="pr-4">
              <label className="block mb-1 text-gray-900">Keterangan</label>
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
          <div className="col-span-2">
            <div className="flex flex-row justify-between">
              Grand Total <span className="font-bold">Rp.2.000.000</span>
            </div>
            <div className="flex flex-row justify-between">
              Bayar <span className="font-bold">Rp.2.000.000</span>
            </div>
            <div className="flex flex-row justify-between">
              Kembali <span className="font-bold">Rp.0</span>
            </div>
          </div>

          <div className="col-span-2">
            <TableMetodePembayaran />
          </div>

          {/* Cetak Button */}
          <div className="col-span-2 float-right">
            <ReactToPrint
              trigger={() => (
                <button className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                  Cetak Nota
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
        </div>
      </Container>

      {/* Print View */}
      <div className="hidden">
        <div ref={componentRef} className="grid grid-cols-4 gap-4">
          <div className="flex flex-row">
            <img className="w-auto h-16" alt="Dentology" src={Logo} />

            <div className="flex flex-col ml-4">
              <p className="w-max font-bold">DENTOLOGY Aesthetic Dental Care</p>
              <p className="w-max">Jl. Teuku Umar Barat No.170A</p>
              <p className="w-max">(0361) 8454854 - 087783102828</p>
            </div>
          </div>
          <div className="  col-span-4 font-bold font-Inter text-right underline">
            INV-2209-0022
          </div>
          <div className="  col-span-2">
            <div className="flex flex-col">
              <p>
                Nama: <span className="font-bold">Jessica Josephine</span>
              </p>
              <p>
                Diagnosa: <span className="font-bold italic">Gingivitis</span>
              </p>
            </div>
          </div>
          <div className="  col-span-2 text-right">
            <div className="flex flex-col">
              <p>
                <span className="font-bold">28 September 2022</span>
              </p>
              <p>
                Dokter:{" "}
                <span className="font-bold">
                  drg. A.A Manik Swayoga, Sp. BM
                </span>
              </p>
            </div>
          </div>

          <div className="col-span-4">
            <hr />
          </div>
          <div className="col-span-4">
            <KasirTable transaksi={Transaksi} />
          </div>

          <div className="col-span-2">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="text-left bg-gray-100">
                <th className="p-3 w-full">Metode Pembayaran</th>
                <th className="p-3">Nominal</th>
              </thead>
              <tbody>
                <tr>
                  <td className="w-44 pr-8 p-3">Cash</td>
                  <td className="w-32 pr-8 p-3">Rp.100.000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-span-2 mt-2">
            <div className="flex flex-row justify-between">
              Grand Total <span className="font-bold">Rp.2.000.000</span>
            </div>
            <div className="flex flex-row justify-between">
              Bayar <span className="font-bold">Rp.2.000.000</span>
            </div>
            <div className="flex flex-row justify-between">
              Kembali <span className="font-bold">Rp.0</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
