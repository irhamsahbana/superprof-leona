import React from "react";
import { ButtonMain, ButtonOutline } from "../Button";

export default function UpdateForm({
  updateData,
  changeTask,
  updateTask,
  cancelUpdate,
}) {
  return (
    <>
      <div className="flex flex-row justify-center w-max">
        <div className="mr-2">
          <textarea
            value={updateData && updateData.title}
            onChange={(e) => changeTask(e)}
            className="flex w-72 border py-2 border-gray-300 bg-white h-24 px-2 rounded-lg"
          />
        </div>
        <div className="flex justify-between">
          <div className="flex-row">
              <ButtonMain
                text="Add Task"
                bgColor="bg-blue-400"
                hoverColor="hover:bg-blue-500"
                onClick={updateTask}
              />
              
            <ButtonOutline
              text="Cancel"
              textColor="text-red-400"
              borderColor="border-red-300"
              hoverColor="hover:bg-red-50"
              onClick={cancelUpdate}
            />
          </div>
        </div>
      </div>
      <br />
    </>
  );
}
