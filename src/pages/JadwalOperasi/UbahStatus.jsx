import React, { useState } from "react";
import BaseModal from "../../layouts/BaseModal";
import { setStatusJadwal } from "../../redux/utilSlice";
import { useDispatch } from "react-redux";
import CreateDialog from "../../components/CreateDialog";

export default function UbahStatus({ open, handleClose }) {
  const dispatch = useDispatch();
  const status = [
    { id: 1, name: "Belum datang" },
    { id: 2, name: "Datang" },
    { id: 3, name: "Cancelled" },
  ];

  return (
    <CreateDialog open={open} handleClose={handleClose} title="Ubah Status Kehadiran">
      <div>
        <select
          onChange={(e) => dispatch(setStatusJadwal(e.target.value))}
          className="bg-gray-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-sky-500 focus:border-sky-500 block w-full px-2"
        >
          {status.map((data, i) => (
            <option key={i} defaultValue={data.id}>
              {data.name}
            </option>
          ))}
        </select>
      </div>
    </CreateDialog>
    // <div>
    //   <BaseModal
    //     heading="Ubah Status Pasien"
    //     handleClose={handleClose}
    //     onClick={handleClick}
    //     text="Save"
    //   >
    //     <div>
    //       <select
    //         onChange={(e) => dispatch(setStatusJadwal(e.target.value))}
    //         className="bg-gray-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-sky-500 focus:border-sky-500 block w-full px-2"
    //       >
    //         {status.map((data, i) => (
    //           <option key={i} defaultValue={value}>
    //             {data.name}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //   </BaseModal>
    // </div>
  );
}
