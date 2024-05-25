import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";

interface AddTodoProps {
  addTodo: (text: string) => Promise<void>;
}

const AddItem: React.FC<AddTodoProps> = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      await addTodo(text);
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
      flex
      items-center
      gap-2
      w-1/3
      justify-center
      "
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
        className="p-2 rounded-md w-2/3"
      />
      <button
        type="submit"
        className="
        flex
        items-center
        justify-center
        size-7
        rounded-full
        hover:opacity-90
        bg-white
        shadow-md
      "
      >
        <IoMdAdd size={24} />
      </button>
    </form>
  );
};

export default AddItem;
