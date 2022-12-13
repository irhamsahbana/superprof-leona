import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import { AiFillEye, AiOutlineRight } from "react-icons/ai";
import { ButtonIcon } from "../../components/Button";
import HistoryData from "../../data/HistoryData.json";
import { useSpinner } from "../../utils/customHooks";

export default function SearchRekamMedis() {
  const [showHistory, setShowHistory] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const historyData = HistoryData[0].now;

  const navigate = useNavigate();
  const showSpinner = useSpinner();
  const handleClose = () => {
    setShowHistory(false);
  };

  const cols = [
    {
      Header: "No.",
      Cell: (row) => {
        return <div>{Number(row.row.index + 1)}</div>;
      },
    },
    {
      Header: "Nama Pasien",
      accessor: "nama",
    },
    {
      Header: "Tanggal",
      accessor: "tanggal",
    },
    {
      Header: "Dokter yang menangani",
      accessor: "dokter",
    },
    {
      Header: "Tindakan",
      accessor: "tindakan",
    },
    {
      Header: "Action",
      accessor: (row, i) => (
        <>
          <div>
            <ButtonIcon
              bgColor="bg-sky-400"
              hoverColor="hover:bg-sky500"
              onClick={() => {
                setSelectedIndex(i);
                setShowHistory(navigate(`/rekam-medis/selected`));
              }}
              icon={<AiOutlineRight />}
            />
          </div>
        </>
      ),
      id: "action",
    },
  ];

  const columns = useMemo(() => cols, [cols]);
  const data = useMemo(() => historyData, []);

  return (
    <>
      {showSpinner}
      <div className="mb-5">
        <h1>Rekam Medis</h1>
      </div>
      <Table columns={columns} data={data} />
    </>
  );
}
