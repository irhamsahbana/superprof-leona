import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
} from "@mui/material";

// must pass open component
export default function DeleteDialog({
  open,
  handleClose,
  handleDelete,
  deletedItem,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {"Apakah Anda yakin ingin menghapus data tersebut?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{deletedItem}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button variant="contained" onClick={handleDelete} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
