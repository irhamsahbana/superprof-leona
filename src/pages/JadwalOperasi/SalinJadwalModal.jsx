import React, { useRef } from "react";
import { ButtonMain, ButtonOutline } from "../../components/Button";
import toast, { Toaster } from "react-hot-toast";

export default function SalinJadwalModal({ handleClose, jadwalList }) {
  const messageRef = useRef();
  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 backdrop-opacity-10 backdrop-invert">
      <div className="flex-col bg-white py-12 px-16 rounded-xl w-max">
        <h3 className="text-center text-xl font-Inter font-bold text-main-blue mb-4">
          Jadwal Operasi, 21 September 2022
        </h3>
        <div
          ref={messageRef}
          id="message"
          className="flex-grow h-56 overflow-y-auto my-8 w-96"
        >
          <p className="font-semibold">Selamat malam,</p>
          <p className="font-semibold pb-2">
            Berikut adalah jadwal Senin, 21 September 2022
          </p>
          {jadwalList.map((jadwal, id) => (
            <div key={id}>
              <h4>{jadwal.ruangan}</h4>
              <h4>{jadwal.dokter}</h4>
              <p>
                {jadwal.nama} | {jadwal.keterangan} | {jadwal.jam_mulai}-
                {jadwal.jam_selesai}{" "}
              </p>
              <br />
            </div>
          ))}
          <p>FO pagi:</p>
          <p>FO siang:</p>
          <p className="mb-2">Terima kasih</p>
        </div>
        <div className="flex flex-row float-right">
          <ButtonOutline
            text="Close"
            hoverColor="hover:bg-slate-50"
            textColor="text-red-400"
            borderColor="border-red-400"
            onClick={handleClose}
          />

          <ButtonMain
            text="Salin Jadwal"
            bgColor="bg-red-400"
            hoverColor="hover:bg-red-500"
            onClick={() => {
              navigator.clipboard.writeText(messageRef.current.innerText);
              toast.success("Jadwal telah disalin!", {
                duration: 2000,
                position: "top-right",
              });
              handleClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
