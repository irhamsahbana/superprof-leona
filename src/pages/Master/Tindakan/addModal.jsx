import React, { useState, useEffect } from "react";
import MainService from "../../../services/MainService";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export const TambahDataModal = ({ open, onClose, onSubmit }) => {
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

  const handleSubmit = (e) => {
    //put your validation logic here
    e.preventDefault();
    onSubmit(inputData);
    onClose();
  };

  const keys = ["tindakan", "biaya", "categoryId"];

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontWeight: "bold",
            mt: 2,
          }}
        >
          Tambah Data Baru 
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form>
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
                  label={k.charAt(0).toUpperCase() + k.slice(1)}
                  name={k}
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  sx={index === 0 && { mt: 2 }}
                />
              ) : (
                <Select
                  name="categoryId"
                  key={index}
                  value={selected}
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
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Tambah
        </Button>
      </DialogActions>
    </Dialog>
  );
};
