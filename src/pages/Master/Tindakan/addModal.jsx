import React, { useState, useEffect } from "react";
import MainService from "../../../services/MainService";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  TextField,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { setSelectedData } from "../../../redux/dokterSlice";

export const TambahDataModal = ({ open, columns, onClose, onSubmit }) => {
  // const [values, setValues] = useState(() =>
  //   columns.reduce((acc, column) => {
  //     acc[column.accessorKey ?? ""] = "";
  //     return acc;
  //   }, {})
  // );

  const initialForm = {
    tindakan: "",
    biaya: 0,
    categoryId: 0,
  };
  const [inputData, setInputData] = useState(initialForm);
  const [relationData, setRelationData] = useState([]);

  const [selected, setSelected] = useState(1);

  useEffect(() => {
    MainService.getAll("categories").then((res) => {
      console.log(res);
      setRelationData(res);
    });
  }, []);

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(inputData);
    onClose();
  };

  const keys = ["tindakan", "biaya", "categoryId"];

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Tambah Data</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {keys.map((k, index) =>
              index < 2 ? (
                <TextField
                  key={index}
                  label={k}
                  name={k}
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              ) : (
                // <select>
                //   {relationData.map((data) => (
                //     <option value={data.id}>{data.nama}</option>
                //   ))}
                // </select>
                <Select
                  name="categoryId"
                  key={index}
                  value={selected}
                  label="Menu"
                  onChange={(e) => {
                    setInputData({ ...inputData, categoryId: e.target.value });
                    setSelected(e.target.value);
                  }}
                >
                  {relationData.map((data) => (
                    <MenuItem value={data.id}>{data.nama}</MenuItem>
                  ))}
                </Select>
              )
            )}
            {/* <Box sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Age
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={10}
                label="Age"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Box> */}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Tambah
        </Button>
      </DialogActions>
    </Dialog>
  );
};
