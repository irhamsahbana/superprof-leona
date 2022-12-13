import React, { useState, useMemo, useEffect } from "react";
// third-party
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsCash } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { DatePicker, Tag } from "antd";
import dayjs from "dayjs";

// components, data, slices
import Table from "../../components/Table";
import {
  ButtonMain,
  ButtonTextIcon,
  ButtonOutline,
} from "../../components/Button";
import ExportToExcel from "../../components/ExportToExcel";
import KasirService from "../../services/KasirService";
import DummyKasir from "../../data/DummyKasir.json";
import SelectDate from "../../components/SelectDate";

export default function Kasir() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dateFormat = "DD/MM/YYYY";

  // useEffect(() => {
  //   KasirService.getAll().then((res) => {
  //     setJadwal(res);
  //   });
  // }, []);

  // const [jadwal, setJadwal] = useState([]);
  // const [showUpdateModal, setShowUpdateModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [editValues, setEditValues] = useState([]);
  // const [toUpdate, setToUpdate] = useState({});
  // const [deleteIndex, setDeleteIndex] = useState(0);

  // const handleCloseUpdate = () => {
  //   setShowUpdateModal(!showUpdateModal);
  // };

  // const handleCloseDelete = () => {
  //   setShowDeleteModal(!showDeleteModal);
  // };

  // const handleDelete = (i) => {};

  const cols = [
    {
      Header: "No.",
      Cell: (row) => {
        return <div>{Number(row.row.index + 1)}</div>;
      },
    },
    {
      Header: "Nama",
      accessor: "nama",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => {
        return value === "Belum Lunas" ? (
          <Tag color="red">{value}</Tag>
        ) : (
          <Tag color="green">{value}</Tag>
        );
      },
    },
    {
      Header: "Action",
      accessor: () => (
        <ButtonOutline
          bgColor="bg-white"
          hoverColor="hover:bg-slate-50"
          borderColor="border-blue-500"
          textColor="text-blue-500"
          text={
            <div className="flex flex-row">
              <span className="flex pt-[2px] pr-1">
                <BsCash />
              </span>
              Proses
            </div>
          }
          onClick={() => {
            navigate("/proses-invoice");
          }}
        ></ButtonOutline>
      ),
      id: "action",
    },
  ];

  const columns = useMemo(() => cols, []);
  const data = useMemo(() => DummyKasir, []);

  return (
    <>
      <div className="mb-5">
        <h1>Kasir</h1>
      </div>
      <div className="flex flex-row">
        <div className="mr-3">
          <DatePicker
            defaultValue={dayjs("12/12/2022", dateFormat)}
            format={dateFormat}
          />
        </div>

      
        <div>
          <ExportToExcel excelData={data} fileName="LaporanTransaksi20092022" />
        </div>
      </div>
      <Table columns={columns} data={data} />
    </>
  );
}
