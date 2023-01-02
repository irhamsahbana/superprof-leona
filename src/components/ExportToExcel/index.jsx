import React from "react";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function ExportToExcel({ excelData, fileName }) {
  const fileType =
    "application/vn.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      {/* https://docs.sheetjs.com/docs/csf/features/formulae/ */}
      <span className="mb-2">
        <Button
          sx={{ textTransform: "none" }}
          onClick={() => exportToExcel(fileName)}
          size="small"
          variant="contained"
          startIcon={<FileDownloadIcon />}
        >
          Export
        </Button>
      </span>
    </>

    // https://www.youtube.com/watch?v=F7dQLO5Jhp4
  );
}
