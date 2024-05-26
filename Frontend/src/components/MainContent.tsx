import React from "react";
import { useTodo } from "../context/TodoContext";
import AddItem from "./AddItem";
import ToDoList from "./ToDoList";

const MainContent: React.FC = () => {
  const { handleServiceSwitch, useApi } = useTodo();
  return (
    <div
      className="
        min-h-screen
        flex
        justify-center
        p-24
        bg-slate-600
        gap-24
        "
    >
      {/* Children here */}
      <div className="flex flex-col w-1/3 items-center gap-4">
        <div className="font-bold text-center text-3xl text-white">
          To-Do-List
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-white">
            Current Service: {useApi ? "Database" : "Local"}
          </span>
          <button
            onClick={handleServiceSwitch}
            className="
              p-2
              rounded-md
              bg-white
              hover:bg-neutral-300
            "
          >
            {useApi ? "Use Local Todo" : "Use Database Todo"}
          </button>
        </div>
        <div className="border-2 w-full" />
        {/* Add */}
        <AddItem />
      </div>

      <div className="flex flex-col w-1/3">
        {/* Show List */}
        <ToDoList />
      </div>
    </div>
  );
};

export default MainContent;
