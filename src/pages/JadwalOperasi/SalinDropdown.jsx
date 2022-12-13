import React from "react";

export default function SalinDropdown({ handleFetchJadwal, handleFetchRM }) {
  return (
    <div>
      <div className="absolute mt-8 left-[38%] top-36 mr-3 px-3 py-2 bg-white rounded-md shadow-lg overflow-hidden z-20 duration-100">
        <div className="px-4 py-3 hover:bg-gray-100">
          <p
            onClick={handleFetchJadwal}
            className=" text-gray-800 text-sm cursor-pointer"
          >
            Jadwal
          </p>
        </div>
        <div className="px-4 py-3 hover:bg-gray-100">
          <p
            onClick={handleFetchRM}
            className="text-sm text-gray-800 cursor-pointer"
          >
            No. RM
          </p>
        </div>
      </div>
    </div>
  );
}
