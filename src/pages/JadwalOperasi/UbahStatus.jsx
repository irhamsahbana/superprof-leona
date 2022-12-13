import React, { useState } from "react";
import BaseModal from "../../layouts/BaseModal";

export default function UbahStatus({ value, handleClose, handleClick}) {

  const status = [
    { id: 1, name: "Belum datang" },
    { id: 2, name: "Menunggu" },
    { id: 3, name: "Sedang berlangsung" },
    { id: 4, name: "Cancelled" },
  ];

  return (
    <div>
      <BaseModal heading="Ubah Status Pasien" handleClose={handleClose} onlick={handleClick} text="Save">
        <div>
          <select className="bg-gray-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-sky-500 focus:border-sky-500 block w-full px-2">
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
