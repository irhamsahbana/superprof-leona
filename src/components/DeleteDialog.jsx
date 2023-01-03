import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
  Stack,
  Box,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

// must pass open component
export default function DeleteDialog({
  open,
  handleClose,
  handleDelete,
  deletedItem,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Stack>
        <Box sx={{ display: "flex" }}>
          <WarningIcon sx={{ color: "red" }} />
          <DialogTitle>
            {"Apakah Anda yakin ingin menghapus data tersebut?"}
          </DialogTitle>
        </Box>

        <DialogContent>
          <DialogContentText>{deletedItem}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Disagree
          </Button>
          <Button variant="contained" onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
