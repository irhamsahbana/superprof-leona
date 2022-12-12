import React, { useState } from "react";
import UpdateForm from "./UpdateForm";
import AddForm from "./AddForm";
import ButtonIcon from "../Button/ButtonIcon";
import { AiFillCheckSquare, AiFillEdit, AiFillDelete } from "react-icons/ai";

export default function Todo() {
  const [toDo, setToDo] = useState([
    {
      id: 1,
      title: "Kontrol 2 minggu lagi: Clare Resimont",
      status: false,
    },
    { id: 2, title: "Exo dengan drg.Agung 1 minggu lagi", status: false },
    { id: 3, title: "Jadwal healing abudment 12/03/2022", status: true },
  ]);

  // temp states
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");
  const [markedDone, setMarkedDone] = useState([]);

  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTask);
  };

  const cancelUpdate = () => {
    setUpdateData("");
  };

  const handleChangeTask = (e) => {
    let newData = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newData);
  };

  const updateTask = () => {
    let filterRecords = [...toDo].filter((task) => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setUpdateData("");
  };

  return (
    <div className="w-auto">
      {/* Forms */}
      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeTask={handleChangeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddForm newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
      )}

      {/* Display Todo */}
      {toDo && toDo.length ? "" : "Nothing To Do..."}
      <div className="h-64">
        <div className="flex-grow h-full overflow-y-auto">
          {toDo &&
            toDo.map((task, i) => {
              // TODO: mobile responsive & delete confirmation
              return (
                <div
                  key={task.id}
                  className="flex-row md:flex-row lg:flex-row mb-1 py-2 px-2 rounded-md w-full overflow-y-auto scroll-smooth"
                >
                  <div className="flex justify-between bg-slate-50 rounded-2xl p-2">
                    <div
                      className={`flex  ${
                        task.status ? "text-gray-300 line-through" : ""
                      }`}
                    >
                      <div className="font-bold">{i + 1}</div>
                      <span className="ml-2 pl-3 pt-1 text-left w-auto mr-4">
                        {task.title}
                      </span>
                    </div>

                    {/* buttons */}
                    <div>
                      <div className="flex flex-row">
                        <ButtonIcon
                          bgColor="bg-emerald-400"
                          hoverColor="hover:bg-emerald-500"
                          onClick={(e) => markDone(task.id)}
                          icon={<AiFillCheckSquare />}
                        />

                        {task.status ? null : (
                          <ButtonIcon
                            bgColor="bg-blue-400"
                            hoverColor="hover:bg-blue-500"
                            onClick={() =>
                              setUpdateData({
                                id: task.id,
                                title: task.title,
                                status: task.status ? true : false,
                              })
                            }
                            icon={<AiFillEdit />}
                          />
                        )}
                        <ButtonIcon
                          bgColor="bg-red-400"
                          hoverColor="hover:bg-red-500"
                          onClick={() => deleteTask(task.id)}
                          icon={<AiFillDelete />}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
