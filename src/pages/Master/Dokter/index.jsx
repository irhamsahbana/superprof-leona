import React, { useState, useMemo, useEffect } from "react";
// third-party
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
// components, data, slices
import Table from "../../../components/Table";
import { ButtonIcon, ButtonAdd } from "../../../components/Button";
import EditDokter from "./edit";
import DokterService from "../../../services/DokterService";
import DeleteModal from "../../../components/DeleteModal";
import TableContentLoader from "../../../components/TableContentLoader";
import toast, { Toaster } from "react-hot-toast";
import {
  setDokter,
  setSelectedData,
  setLoading,
  setValidate,
} from "../../../redux/dokterSlice";

export default function ViewDokter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { dokter, loading, validate } = useSelector((state) => state.dokter);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editValues, setEditValues] = useState([]);
  const [toUpdate, setToUpdate] = useState({});
  const [index, setIndex] = useState();

  const [alertDelete, setAlertDelete] = useState(false);

  useEffect(() => {
    DokterService.getAll().then((res) => {
      dispatch(setDokter(res));
      console.log(dokter.length);
    });
    dispatch(setLoading(false));
  }, []);

  // for demo purposes
  useEffect(() => {
    DokterService.getAll().then((res) => {
      dispatch(setDokter(res));
    });
  }, [showUpdateModal]);

  useEffect(() => {
    showToaster();
  }, [dokter]);

  const handleCloseUpdate = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDelete = (i) => {
    DokterService.removeData(i)
      .then((res) => {
        handleCloseDelete();
        navigate(0);
        setAlertDelete(true);
      })
      .catch((err) => {
        console.warn(err);
        handleCloseDelete();
        navigate(0);
      });
  };

  const getDokter = (id) => {
    DokterService.get(id)
      .then((res) => {
        dispatch(setSelectedData(res.data));
      })
      .catch((e) => console.log(`Error: ${e}`));
  };

  const showToaster = () => {
    validate.specific.edit &&
      toast.success("Data telah berhasil diubah!", {
        duration: 2000,
        position: "top-right",
      });
  };

  const cols = [
    {
      Header: "No.",
      accessor: "id",
    },
    {
      Header: "Nama",
      accessor: "nama",
    },
    {
      Header: "Spesialis",
      accessor: "spesialis",
    },
    {
      Header: "Action",
      Cell: (row) => (
        <div className="flex flex-row z-100">
          <ButtonIcon
            bgColor="bg-red-400"
            hoverColor="hover:bg-red-500"
            onClick={() => {
              console.log(row.row.values.id);
              setShowDeleteModal(true);
              setIndex(row.row.values.id);
            }}
            icon={<BsFillTrashFill />}
          />
          <ButtonIcon
            bgColor="bg-slate-400"
            hoverColor="hover:bg-slate-500"
            onClick={() => {
              dispatch(setValidate(false));
              console.log(row.row.values.id);
              setShowUpdateModal(true);
              getDokter(row.row.values.id);
            }}
            icon={<BsPencilFill />}
          />
        </div>
      ),
      id: "action",
    },
  ];

  const columns = useMemo(() => cols, []);
  const data = useMemo(() => dokter, [dokter]);

  return (
    <>
      <div className="mb-5">
        <h1>
          Master Data: <span className="text-blue-500 text-2xl">Dokter</span>
        </h1>
      </div>
      <div className="flex flex-row h-8">
        <ButtonAdd onClick={() => navigate("/add-dokter")} />
      </div>
      {loading ? (
        <TableContentLoader />
      ) : (
        <Table columns={columns} data={data} />
      )}

      {showUpdateModal && (
        <EditDokter
          handleClose={handleCloseUpdate}
          columns={columns}
          selectedValue={editValues}
          toUpdate={toUpdate}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          handleClose={handleCloseDelete}
          handleDelete={() => handleDelete(index)}
        />
      )}

      {/* {validate.general && <Toaster />} */}
      <Toaster />
    </>
  );
}
