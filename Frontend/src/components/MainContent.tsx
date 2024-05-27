import React from "react";
import AddItem from "./AddItem";
import ToDoList from "./ToDoList";
import ServiceSwitch from "./ServiceSwitch";

const MainContent: React.FC = () => {
  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
        items-center
        px-24
        pt-16
        bg-slate-600
        gap-8
        "
    >
      <div className="flex flex-col gap-4 w-2/3 items-center">
        <div className="font-bold text-center text-3xl text-white">
          To-Do-List
        </div>
        <ServiceSwitch />
        <div className="border-2 w-full" />
      </div>

      <div className="flex justify-center h-[40rem] w-full gap-24">
        {/* Add */}
        <div className="flex flex-col items-center gap-4 w-1/3">
          <AddItem />
        </div>

        {/* Show List */}
        <div className="flex flex-col w-1/3">
          <ToDoList />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
