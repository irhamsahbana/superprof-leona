import React from "react";
import ButtonMain from "../Button/ButtonMain";

export default function AddForm({ newTask, setNewTask, addTask }) {
  return (
    <>
      <div className="flex flex-row">
        <input
          value={newTask}
          placeholder="I need to do..."
          onChange={(e) => setNewTask(e.target.value)}
          className="border border-gray-300 bg-white pl-3 pr-2 rounded-xl text-sm"
        />
        <div className="ml-2 w-full inline">
          <ButtonMain
            text="Add Task"
            bgColor="bg-blue-400"
            hoverColor="hover:bg-blue-500"
            onClick={addTask}
          />
        </div>
      </div>
      <br />
    </>
  );
}
