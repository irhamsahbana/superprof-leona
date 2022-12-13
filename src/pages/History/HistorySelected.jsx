import React, {useState, useMemo} from "react";
import { ButtonIcon } from "../../components/Button";
import Table from "../../components/Table";
import HistoryModal from "./HistoryModal";
import { AiFillEye } from "react-icons/ai";
import DummySelectedHistory from "./DummySelectedHistory.json";

export default function HistorySelected(props) {
  const [showHistory, setShowHistory] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selectedHistory = DummySelectedHistory;

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
              bgColor="bg-red-400"
              hoverColor="hover:bg-red-500"
              onClick={() => {
                console.log("view");
                setSelectedIndex(i);
                setShowHistory(!showHistory);
              }}
              icon={<AiFillEye />}
            />
          </div>
        </>
      ),
      id: "action",
    },
  ];

  const columns = useMemo(() => cols, [cols]);
  const data = useMemo(() => selectedHistory, []);

  return (
    <>
      <div className="mb-5">
        <h1>         {" "}
          Data Transaksi:{" "}
          <span className="text-blue-500 text-2xl">Jessica Josephine</span></h1>
          <p>History Transaksi Jessica Josephine</p>
      </div>

      <Table columns={columns} data={data} />
      {showHistory && (
        <HistoryModal
          handleClose={handleClose}
          historyData={selectedHistory}
          i={selectedIndex}
        />
      )}
    </>
  );
}
