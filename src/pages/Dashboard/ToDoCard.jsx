import React from "react";
import Todo from "../../components/ToDo/Todo";

export default function ToDoCard() {
  return (
    <div className="mb-4 sm:mt-10 md:mt-0 lg:mt-0 md:ml-10 lg:ml-10 w-full">
      <p className="font-bold text-xl">To-do List:</p>
      <p className="text-gray-500 mb-4">Berisi notes dari perawat dan dokter beserta kerjaan lainnya.</p>
      <div className="bg-white shadow-lg rounded-2xl p-5">
        <Todo />
      </div>
    </div>
  );
}
