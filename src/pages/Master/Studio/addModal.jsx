import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

export const TambahDataModal = ({ open, columns, onClose, onSubmit }) => {
  const initialForm = {
    studios: "",
  };
  const [inputData, setInputData] = useState(initialForm);

  const handleSubmit = (e) => {
    //put your validation logic here
    e.preventDefault();
    onSubmit(inputData);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Tambah Data</DialogTitle>
      <DialogContent>
        <form>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            ))}
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
