import React, { useState, useMemo, useEffect } from "react";
// third-party
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { FiRefreshCcw, FiCopy } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { Tag } from "antd";
import toast, { Toaster } from "react-hot-toast";
// components, data, slices
import ExportToExcel from "../../components/ExportToExcel";
import SelectDate from "../../components/SelectDate";
import Table from "../../components/Table";
import {
  ButtonIcon,
  ButtonOutline,
  ButtonAdd,
  ButtonTextIcon,
} from "../../components/Button";
import SalinDropdown from "./SalinDropdown";
import DeleteModal from "../../components/DeleteModal";
import TableContentLoader from "../../components/TableContentLoader";
import UbahStatus from "./UbahStatus";
import JadwalService from "../../services/JadwalService";
import SalinJadwalModal from "./SalinJadwalModal";

export default function JadwalOperasi() {
  const { dokter } = useSelector((state) => state.dokter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showChangeStatus, setShowChangeStatus] = useState(false);

  const [loading, setLoading] = useState(false);
  const [jadwal, setJadwal] = useState([]);

  // -- salin states
  const [showSalin, setShowSalin] = useState(false);
  const [salin, setSalin] = useState({ jadwal: false, noRm: false });

  useEffect(() => {
    getAllJadwal();
    console.log(dokter);
  }, []);

  // useEffect(() => {
  //   tempJadwal.map((val, idx) => {
  //     if (
  //       dokter[idx] != undefined &&
  //       tindakan[idx] != undefined &&
  //       ruangan[idx] != undefined
  //     ) {
  //       let temp = {
  //         id: val.id,
  //         nama: val.nama,
  //         tindakan: tindakan[idx],
  //         dokter: dokter[idx],
  //         ruangan: ruangan[idx],
  //         jam: `${val.start}-${val.end}`,
  //         status: val.status,
  //       };
  //       setJadwal([...jadwal, temp]);
  //       setLoading(true);
  //     }
  //   });
  // }, [isMounted, dokter, tindakan, ruangan]);

  const handleCloseUpdate = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  const getAllJadwal = () => {
    JadwalService.getAll()
      .then((res) => {
        setJadwal(res.data[0].now);
        console.log(res.data[0].now);
      })
      .catch((e) => console.log(`Error: ${e}`));
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  // dummy remove
  const handleDelete = () => {
    setShowDeleteModal(!showDeleteModal);
    toast.success("Jadwal berhasil dihapus!", {
      duration: 4000,
      position: "top-right",
    });
  };

  const handleCloseMessage = () => {
    setSalin({ jadwal: false });
    console.log("closing");
  };

  const handleCloseChangeStatus = () => {
    setShowChangeStatus(!showChangeStatus);
  };

  const handleFetchJadwal = () => {
    setShowSalin(false);
    setSalin({ jadwal: true });
    console.log(salin.jadwal);
    console.log("salin jadwal *");
  };

  const handleFetchRm = () => {
    setShowSalin(false);
    setSalin({ noRm: !salin.noRm });
    console.log(salin.noRm);
    console.log("salin noRm *");
  };

  const cols = [
    {
      Header: "No.",
      Cell: (row) => {
        return <div>{Number(row.row.index + 1)}</div>;
      },
    },
    {
      // TODO: make link
      Header: "Nama",
      accessor: "nama",
    },
    {
      Header: "Dokter",
      accessor: "dokter",
    },
    {
      Header: "Ruangan",
      accessor: "ruangan",
    },
    {
      Header: "Jam Selesai",
      accessor: "jam_selesai",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => {
        return value === "Belum datang" ? (
          <Tag color="red">{value}</Tag>
        ) : value === "Selesai" ? (
          <Tag color="green">{value}</Tag>
        ) : value === "Cancelled" ? (
          <Tag color="default">{value}</Tag>
        ) : (
          <Tag color="blue">{value}</Tag>
        );
      },
    },
    {
      Header: "Action",
      accessor: (row, i) => (
        <>
          <div className="flex flex-row z-100">
            <ButtonIcon
              bgColor="bg-slate-400"
              hoverColor="hover:bg-slate-500"
              onClick={() => {
                setShowUpdateModal(!showUpdateModal);
              }}
              icon={<BsPencilFill />}
            />
            <ButtonIcon
              bgColor="bg-red-400"
              hoverColor="hover:bg-red-500"
              onClick={() => {
                console.log(row);
                setShowDeleteModal(true);
              }}
              icon={<BsFillTrashFill />}
            />
            <div>
              <ButtonIcon
                bgColor="bg-sky-400"
                hoverColor="hover:bg-sky-500"
                onClick={() => {
                  console.log("Ubah Status !!!");
                  setShowChangeStatus(true);
                }}
                icon={<FiRefreshCcw />}
              />
            </div>
          </div>
        </>
      ),
      id: "action",
    },
  ];

  const showSalinDropdown = () => {
    setShowSalin(!showSalin);
    console.log(showSalin);
  };

  const columns = useMemo(() => cols, []);
  const data = useMemo(() => jadwal, [jadwal]);

  return (
    <>
      <div className="mb-3">
        <h1>Jadwal Operasional</h1>
      </div>
      <div className="flex flex-row">
        <div className="mr-4">
          <SelectDate />
        </div>

        <ButtonAdd onClick={() => navigate("/jadwal/add")} />

        <div>
          <ExportToExcel excelData={data} fileName="JadwalOperasi_22092022" />
        </div>
        <div>
          <ButtonOutline
            onClick={showSalinDropdown}
            hoverColor="relative hover:bg-slate-100"
            borderColor="border-blue-500"
            textColor="text-blue-500"
            text={
              <div className="flex flex-row">
                <span className="flex pt-[2px] pr-1">
                  <FiCopy />
                </span>
                Salin
              </div>
            }
          />
        </div>
      </div>

      {loading ? (
        <TableContentLoader />
      ) : (
        <Table columns={columns} data={data} />
      )}
      {/* 
      {showUpdateModal && (
        <EditDokter
          handleClose={handleCloseUpdate}
          columns={columns}
          selectedValue={editValues}
          toUpdate={toUpdate}
        />
      )} */}

      {showSalin && (
        <SalinDropdown
          handleFetchJadwal={handleFetchJadwal}
          handleFetchRM={handleFetchRm}
        />
      )}
      {salin.jadwal && (
        <SalinJadwalModal
          handleClose={handleCloseMessage}
          jadwalList={jadwal}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          handleClose={handleCloseDelete}
          handleDelete={handleDelete}
        />
      )}
      {showChangeStatus && <UbahStatus handleClose={handleCloseChangeStatus} />}
      <Toaster />
    </>
  );
}
