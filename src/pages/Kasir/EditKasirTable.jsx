import React, { useState, useEffect, useCallback } from "react";
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

export default function EditKasirTable(props) {
  const [openModal, setOpenModal] = useState(false); // create modal
  const [openEditModal, setOpenEditModal] = useState(false); // edit modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // delete modal

  const [tindakanList, setTindakanList] = useState([]); // get All

  const [selectedTindakanId, setSelectedTindakanId] = useState(1);
  const [selectedTindakan, setSelectedTindakan] = useState({}); // get

  const [addedTransaction, setAddedTransaction] = useState({
    tindakan: "",
    qty: 0,
    biaya: 0,
    discount: 0,
    subtotal: 0,
  }); // transacition about to be added
  const [currentTransaction, setCurrentTransaction] = useState({});

  const diskon = [10, 15, 20];
  useEffect(() => {
    MainService.getAll("treatments").then((res) => {
      setTindakanList(res);
    });
  }, [tindakanList.length]);

  useEffect(() => {
    MainService.get("treatments", selectedTindakanId).then((res) => {
      setSelectedTindakan(res);
      console.log(res);
    });
  }, [selectedTindakanId]);

  //TODO: transaction calculation
  // let calculateSubtotal = useCallback(() => {}, [
  //   calculations,
  //   props.transaksi,
  // ]);

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

  let transaksiList = props.transaksi.map((item, i) => {
    // console.log(item);
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
                setSelectedTindakanId(i);
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
                setSelectedTindakanId(i);
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
      <CreateDialog
        title="Tambah Tindakan"
        open={openModal}
        handleClose={() => setOpenModal(false)}
      >
        <FormControl></FormControl>
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

      <CreateDialog
        title="Ubah Tindakan"
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
      >
        <FormControl>
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
          </Box>
        </FormControl>
      </CreateDialog>

      <DeleteDialog
        open={openDeleteModal}
        deletedItem={selectedTindakan[selectedTindakanId]}
        handleClose={() => setOpenDeleteModal(false)}
      />
    </>
  );
}
