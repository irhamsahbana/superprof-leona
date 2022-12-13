import React from "react";
import { DatePicker, Tag } from "antd";
import dayjs from "dayjs";

export default function SelectDate() {
  const dateFormat = "DD/MM/YYYY";
  return (
    <div>
      <DatePicker
        defaultValue={dayjs("14/12/2022", dateFormat)}
         // TODO: change color of this
        style={{ color: "white" }}
      />
    </div>
  );
}
