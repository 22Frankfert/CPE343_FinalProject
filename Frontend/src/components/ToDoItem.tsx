import React from "react";
import { ITodo } from "../interfaces/todo";
import DeleteItem from "./DeleteItem";
import clsx from "clsx";
import { useTodo } from "../context/TodoContext";

interface ToDoItemProps {
  todo: ITodo;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodo();

  return (
    <div
      className={clsx(
        `
        flex
        px-4
        py-2
        rounded-lg
        justify-between
        items-center
        shadow-lg
        `,
        todo.completed ? "bg-neutral-500 opacity-70" : "bg-neutral-300"
      )}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="
          size-6
        "
      />
      <div className="flex flex-1 flex-col mx-8 gap-2">
        <p
          className={clsx(
            `
            font-semibold
            text-xl
            `,
            todo.completed ? "line-through" : "none"
          )}
        >
          {todo.text}
        </p>
        <div className="flex gap-2">
          <p className="px-1 py-0.5 rounded-lg bg-white">{todo.priority}</p>
          {todo.dueDate && (
            <p className="px-1 py-0.5 rounded-lg bg-white">
              due: {todo.dueDate?.getDay()}/{todo.dueDate?.getMonth()}/
              {todo.dueDate?.getFullYear()}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2">
        <DeleteItem todo={todo} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
};

export default ToDoItem;
