import { FaTrash } from "react-icons/fa6";
import { ITodo } from "../interfaces/todo";
import React from "react";

interface DeleteItemProps {
  todo: ITodo;
  deleteTodo: (id: string) => Promise<void>;
}

const DeleteItem: React.FC<DeleteItemProps> = ({ todo, deleteTodo }) => {
  return (
    <button
      onClick={() => deleteTodo(todo.id)}
      className="
      flex
      items-center
      justify-center
      p-2
      rounded-md
      text-red-500
      hover:bg-neutral-400
    "
    >
      <FaTrash size={20} />
    </button>
  );
};

export default DeleteItem;
