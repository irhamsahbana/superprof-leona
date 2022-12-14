import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { AiOutlineSearch } from "react-icons/ai";

export default function ColumnFilter({ column }) {
  const {filterValue, setFilter} = column
  return (
    <span className="z-1">
      <div
        id="search-container"
        className="w-72"
      >
        <span className="flex absolute text-left align-middle py-1 pl-2 mt-1">
          <AiOutlineSearch />
        </span> 
        <input
          value={filterValue|| ""}
          placeholder="Search"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
    </span>
  );
}
