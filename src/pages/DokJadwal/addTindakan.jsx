import React, { useState, useEffect, useCallback } from "react";
import { ButtonBack } from "../../components/Button";
import Container from "../../layouts/Container";
import Save from "@mui/icons-material/Save";
import {
  Button,
  Tooltip,
  IconButton,
  Stack,
  TextField,
  MenuItem,
  Box,
  InputAdornment,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PercentIcon from "@mui/icons-material/Percent";
import EditIcon from "@mui/icons-material/Edit";
import CreateDialog from "../../components/CreateDialog";
import DeleteDialog from "../../components/DeleteDialog";
// service
import MainService from "../../services/MainService";
import DeleteModal from "../../components/DeleteModal";
import { useSelector } from "react-redux";

// props pasien (nama, no rm), jadwal (dokter, tanggal), treatment/ tindakan (tindakan, biaya, qty, diskon, subtotal)
// dont use props but pass via redux
export default function DokAddTindakan(props) {
  const [openModal, setOpenModal] = useState(false); // create modal
  const [openEditModal, setOpenEditModal] = useState(false); // edit modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // delete modal
  const [tindakanList, setTindakanList] = useState([]); // get All

  // for add tindakan states
  const { selectedPatient, selectedPatientsTreatment } = useSelector(
    (state) => state.tindakan
  );

  const [addedTransaction, setAddedTransaction] = useState({
    tindakan: "",
    qty: 0,
    biaya: 0,
    discount: 0,
    subtotal: 0,
  }); // transacition about to be added

  const [selectedTindakan, setSelectedTindakan] = useState(0);
  const [selectedTindakanId, setSelectedTindakanId] = useState(0);

  // for edit transactions
  const [selectedTransactionId, setSelectedTransactionId] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState({});

  const diskon = [10, 15, 20];

  useEffect(() => {
    MainService.getAll("treatments").then((res) => {
      setTindakanList(res);
    });
  }, [tindakanList.length]);

  //   useEffect(() => {
  //     MainService.get("treatments", selectedTindakanId).then((res) => {
  //       setSelectedTindakan(res);
  //       console.log(res);
  //     });
  //   }, [selectedTindakanId]);

  // for value in select box
  const handleChangeTindakan = (e) => {
    setSelectedTindakanId(e.target.value);
  };

  const handleChange = (e) => {
    setAddedTransaction({
      ...addedTransaction,
      [e.target.name]: e.target.value,
    });
  };

  //   mapping values of transaksi
  let transaksiList = props.transaksi.map((item, i) => {
    return (
      <tr key={i}>
        <td className="px-8 py-2">{item.tindakan}</td>
        <td className="px-8 py-2 text-center">{item.qty}</td>
        <td className="px-8 py-2 text-right">{item.biaya}</td>
        <td className="px-8 py-2 text-center">{item.diskon}</td>
        <td className="px-8 py-2 text-right">{item.total}</td>
        <td className="px-8 py-2  flex justify-around">
          <Tooltip arrow placement="right" title="Edit">
            <IconButton
              onClick={() => {
                setOpenEditModal(true);
                // array starts from 0
                setSelectedTransactionId(i);
                console.log(props.transaksi[selectedTransactionId]);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="right" title="Hapus">
            <IconButton
              color="error"
              onClick={() => {
                setOpenDeleteModal(true);
                setSelectedTransactionId(i);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div>
        <ButtonBack />
        <div id="header-container" className="flex flex-row justify-between">
          <div id="header-left" className="flex flex-col mb-4">
            <h1>Ubah Detail Transaksi</h1>
          </div>
          <span>
            <Button
              sx={{ textTransform: "none" }}
              type="submit"
              size="small"
              variant="contained"
              startIcon={<Save />}
            >
              Simpan
            </Button>
          </span>
        </div>
        <div className="mb-1">
          <Container>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <div>
                      Nama Pasien:{" "}
                      <span className="font-bold">Jessica Josephine</span>
                    </div>
                    <div className="mt-1">
                      Dokter: <span className="font-bold">drg. Andy</span>
                    </div>
                    <div className="mt-1">
                      Ruangan: <span className="font-bold">Studio 2</span>
                    </div>
                  </div>

                  <div>
                    Tanggal:{" "}
                    <span className="font-bold">28 September 2022</span>
                  </div>
                </div>
              </div>

              <div className="col-span-4 p-0">
                <hr />
              </div>

              <div className="col-span-4 mt-3">
                {/* the table */}
                <div className="flex flex-col">
                  <span className="mb-2">
                    <Button
                      sx={{ textTransform: "none" }}
                      onClick={() => {
                        setOpenModal(true);
                      }}
                      size="small"
                      variant="contained"
                      startIcon={<AddIcon />}
                    >
                      Tambah Tindakan
                    </Button>
                  </span>
                  <div className="overflow-x-auto">
                    <div className="p-1.5 w-full inline-block align-middle">
                      <div className="overflow-x-auto border">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="p-3">Tindakan</th>
                              <th className="p-3">Qty</th>
                              <th className="p-3">Biaya</th>
                              <th className="p-3">Diskon</th>
                              <th className="p-3">Total Biaya</th>
                              <th className="p-3"></th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {transaksiList}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-2 mt-2">
                <div className="pr-4">
                  <label className="block mb-1 text-gray-900 font-bold">
                    Keterangan
                  </label>
                  <div>
                    <textarea
                      type="text"
                      className="w-full h-fit bg-white border border-gray-300 text-gray-900 rounded-lg block py-2 px-3"
                      value="Jadwal kontrol 3 minggu lagi; BY"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2 mt-6">
                <div className="flex flex-row justify-between">
                  Subtotal <span className="font-bold">Rp.2.000.000</span>
                </div>
                <div className="flex flex-row justify-between">
                  Diskon <span className="font-bold">Rp.20.000</span>
                </div>
                <div className="flex flex-row justify-between">
                  Grand Total <span className="font-bold">Rp.1.080.000</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* add tindakan untuk pasien */}
      <CreateDialog
        title="Tambah Tindakan"
        open={openModal}
        handleClose={() => setOpenModal(false)}
      >
        <Stack spacing={2}>
          <TextField
            style={{ marginTop: 20 }}
            label="Tindakan"
            fullWidth
            select
            variant="outlined"
            value={selectedTindakan.id || ""}
            margin="dense"
            helperText="Pilih tindakan yang dilakukan"
            onChange={handleChangeTindakan}
          >
            {tindakanList.map((option) => (
              <MenuItem key={option.tindakan} value={option.id}>
                {option.tindakan}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            variant="outlined"
            label="Biaya"
            value={selectedTindakan.biaya || 0}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp.</InputAdornment>
              ),
            }}
            disabled
          />
          <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
            spacing={2}
          >
            <TextField
              variant="outlined"
              label="Qty"
              type="number"
              value={addedTransaction.qty || ""}
              onChange={handleChange}
            />
            <TextField
              sx={{ width: 180 }}
              variant="outlined"
              label="Diskon"
              type="number"
              name="qty"
              value={addedTransaction.discount || ""}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PercentIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Nominal diskon"
              name="discount"
              value={addedTransaction.discount || 0}
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp.</InputAdornment>
                ),
              }}
            />
          </Box>

          <TextField
            fullWidth
            variant="outlined"
            label="Subtotal"
            value={addedTransaction.subtotal || 0}
            name="subtotal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp.</InputAdornment>
              ),
            }}
            disabled
          />
        </Stack>
      </CreateDialog>

      {/* edit tindakan yg sudah ada */}
      <CreateDialog
        title="Ubah Tindakan"
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
      >
        <FormControl>
          <Stack sx={{ alignItems: "center", mt: 2 }} spacing={1}>
            <TextField
              variant="outlined"
              label="Qty"
              type="number"
              name="qty"
              value={props.transaksi[selectedTransactionId].qty || ""}
              onChange={handleChange}
              sx={{ width: 120 }}
            />
            <TextField
              sx={{ width: 180 }}
              variant="outlined"
              label="Diskon"
              type="number"
              name="diskon"
              defaultValue={props.transaksi[selectedTransactionId].diskon || ""}
              // TODO: fix handle change
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PercentIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </FormControl>
      </CreateDialog>

      {/* <DeleteDialog
        open={openDeleteModal}
        deletedItem={selectedTindakan[selectedTindakanId]}
        handleClose={() => setOpenDeleteModal(false)}
      /> */}

      <DeleteModal
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
      />
    </>
  );
}
