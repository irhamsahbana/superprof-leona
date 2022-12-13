import React, { useState, useMemo } from "react";
import Container from "../../layouts/Container";
import { ButtonIcon, ButtonMain } from "../../components/Button";
import Table from "../../components/Table";
import { AiFillEye } from "react-icons/ai";
import DummySelectedHistory from "../History/DummySelectedHistory.json";
import { useNavigate } from "react-router-dom";
import TindakanModal from "./TindakanModal";

export default function CurrentRekamMedis() {
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selectedHistory = DummySelectedHistory;

  const handleClose = () => {
    setShowHistory(false);
  };

  const handleNavigate = () => {
    navigate("/odontogram");
  };

  const cols = [
    {
      Header: "No.",
      Cell: (row) => {
        return <div>{Number(row.row.index + 1)}</div>;
      },
    },
    {
      Header: "Tanggal",
      accessor: "tanggal",
    },
    {
      Header: "Diagnosa",
      accessor: "diagnosa",
    },
    {
      Header: "Tindakan",
      accessor: "tindakan",
    },
    {
      Header: "Dokter yang menangani",
      accessor: "dokter",
    },
    {
      Header: "Action",
      accessor: (row, i) => (
        <>
          <div>
            <ButtonIcon
              bgColor="bg-sky-400"
              hoverColor="hover:bg-sky-500"
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
    <div>
      <div className="mb-5">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <h1>Rekam Medis:</h1>
            <span className="text-blue-500 font-bold text-2xl pl-2">
              Jessica Josephine
            </span>
          </div>
          <div>
            <ButtonMain
              text="View Odontogram"
              bgColor="bg-blue-500 hover:bg-blue-600"
              onClick={handleNavigate}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row lg:flex-row mb-3 justify-between">
        <div className="w-full mr-4">
          <Container text="Biodata">
            <div className="flex flex-row">
              <div className="flex flex-col font-bold">
                <p>Nama</p>
                <p>Tempat, Tanggal Lahir</p>
                <p>Alamat</p>
                <p>No. Telepon</p>
              </div>
              <div className="flex flex-col font-bold ml-2">
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
              </div>
              <div className="flex flex-col ml-3">
                <p>Jessica Josephine</p>
                <p>Jakarta, 16 September 2000</p>
                <p>Jl. Bayu II, Mengwi</p>
                <p>08113937777</p>
              </div>
            </div>
          </Container>
        </div>
        <div className="w-full">
          <Container text="Alergi, Riwayat Medis">
            <div className="flex flex-row">
              <div className="flex flex-col font-bold">
                <p>Alergi</p>
                <p>Medication</p>
                <p>Riwayat Medis</p>
              </div>
              <div className="flex flex-col font-bold ml-2">
                <p>:</p>
                <p>:</p>
                <p>:</p>
              </div>
              <div className="flex flex-col ml-4">
                <p>-</p>
                <p>Trynothoid, Rinavel</p>
                <ul className="list-disc ml-3">
                  <li>Asthma</li>
                  <li>Sinus</li>
                </ul>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <div>
        <Container text="History Tindakan">
          <Table columns={columns} data={data} />
        </Container>
      </div>
      {showHistory && (
        <TindakanModal
          handleClose={handleClose}
          historyData={data}
          i={selectedIndex}
        />
      )}
    </div>
  );
}
