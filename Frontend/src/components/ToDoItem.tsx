import React from "react";
import { ITodo } from "../interfaces/todo";
import DeleteItem from "./DeleteItem";
import clsx from "clsx";

interface ToDoItemProps {
  todo: ITodo;
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

const ToDoItem: React.FC<ToDoItemProps> = ({
  todo,
  toggleTodo,
  deleteTodo,
}) => {
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
      <div className="flex flex-1 flex-col mx-8">
        <p
          className={clsx(
            `
            font-semibold
            text-xl
            `,
            todo.completed ? "line-through" : "none"
          )}
        >
          {todo.text} - {todo.priority}
        </p>
      </div>
      <div className="flex flex-col justify-center gap-2">
        <DeleteItem todo={todo} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
};

export default ToDoItem;
