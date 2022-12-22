import React, { useState } from "react";
import BaseModal from "../../layouts/BaseModal";
import { setStatusJadwal } from "../../redux/utilSlice";
import { useDispatch } from "react-redux";

export default function UbahStatus({ value, handleClose, handleClick }) {
  const dispatch = useDispatch();
  const status = [
    { id: 1, name: "Belum datang" },
    { id: 2, name: "Menunggu" },
    { id: 3, name: "Sedang berlangsung" },
    { id: 4, name: "Cancelled" },
    { id: 5, name: "Selesai" },
  ];

  return (
    <div>
      <BaseModal
        heading="Ubah Status Pasien"
        handleClose={handleClose}
        onClick={handleClick}
        text="Save"
      >
        <div>
          <select
            onChange={(e) => dispatch(setStatusJadwal(e.target.value))}
            className="bg-gray-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-sky-500 focus:border-sky-500 block w-full px-2"
          >
            {status.map((data, i) => (
              <option key={i} defaultValue={value}>
                {data.name}
              </option>
            ))}
          </select>
        </div>
      </BaseModal>
    </div>
  );
}
