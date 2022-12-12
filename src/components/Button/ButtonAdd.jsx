import React from "react";
import ButtonTextIcon from "./ButtonTextIcon";
import { IoMdAdd } from "react-icons/io";

export default function ButtonAdd(props) {
  return (
    <ButtonTextIcon
      bgColor="bg-blue-400"
      hoverColor="hover:bg-blue-600"
      icon={<IoMdAdd />}
      text="Tambah data"
      onClick={props.onClick}
    />
  );
}
