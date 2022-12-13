import React from "react";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import { BiExport } from "react-icons/bi";
import { ButtonMain, ButtonOutline } from "../Button";
import { Button } from "antd";

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
      <ButtonOutline
        bgColor="bg-white"
        hoverColor="hover:bg-slate-50"
        borderColor="border-blue-500"
        textColor="text-blue-500"
        text={
          <div className="flex flex-row">
            <span className="flex pt-[2px] pr-1">
              <BiExport />
            </span>
            Export
          </div>
        }
        onClick={() => exportToExcel(fileName)}
      ></ButtonOutline>
    </>

    // https://www.youtube.com/watch?v=F7dQLO5Jhp4
  );
}
