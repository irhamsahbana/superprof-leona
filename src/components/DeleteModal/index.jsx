import React from "react";
import { Button, Dialog, DialogActions, Stack, } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

export default function DeleteModal({
  handleClose,
  handleDelete,
  // selectedData,
  open,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Stack alignItems="center">
        <div className="flex justify-center items-center fixed inset-0 z-10 backdrop-opacity-10 backdrop-invert">
          <div className="flex-col bg-white py-12 px-16 rounded-xl">
            <WarningIcon
              sx={{
                color: "orange",
                fontSize: "40px",
                alignItems: "center",
                textAlign: "center",
                ml: 10,
                mb: 2,
              }}
            />
            <h3 className="text-center text-xl font-Inter font-bold text-main-blue mb-4">
              Apakah anda yakin <br />
              ingin menghapus data ini
            </h3>
            {/* <p>{selectedData}</p> */}
            <div className="flex flex-row justify-center">
              {/* <ButtonOutline
              text="Cancel"
              hoverColor="hover:bg-slate-50"
              textColor="text-red-400"
              borderColor="border-red-400"
              onClick={handleClose}
              
            />
            <ButtonMain
              text="Hapus"
              bgColor="bg-red-400"
              hoverColor="hover:bg-red-500"
              onClick={handleDelete}
            /> */}
              {/* <DialogContent>
                <DialogContentText>{deletedItem}</DialogContentText>
              </DialogContent> */}
              <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="error">
                  Cancel
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={handleDelete}
                  autoFocus
                >
                  Hapus
                </Button>
              </DialogActions>
            </div>
          </div>
        </div>
      </Stack>
    </Dialog>
  );
}
