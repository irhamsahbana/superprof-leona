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
// for creating data
export default function CreateDialog({
  open,
  handleClose,
  onClick,
  children,
  title,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        {title}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={onClick} autoFocus>
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
}
