import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import { useTodo } from "../context/TodoContext";
import FilterToggleSwitch from "./FilterSwitch";

const ToDoList: React.FC = () => {
  const { todos } = useTodo();
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true; // 'all'
  });

  const handleFilterChange = (newFilter: "all" | "completed" | "pending") => {
    setFilter(newFilter);
  };

  return (
    <>
      <FilterToggleSwitch onFilterChange={handleFilterChange} />
      <div className="flex flex-col p-4 gap-4 w-1/3">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => <ToDoItem key={todo.id} todo={todo} />)
        ) : (
          <span
            className="
            text-center
            text-xl
            text-white
            font-semibold
          "
          >
            Nothing to do yet!
          </span>
        )}
      </div>
    </>
  );
};

export default ToDoList;
