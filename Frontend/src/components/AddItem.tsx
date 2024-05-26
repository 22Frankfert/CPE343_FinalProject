import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Priority } from "../interfaces/todo";

interface AddTodoProps {
  addTodo: (
    text: string,
    priority: Priority,
    category: string
  ) => Promise<void>;
}

const AddItem: React.FC<AddTodoProps> = ({ addTodo }) => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("low");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      await addTodo(text, priority, category);
      setText("");
      setPriority("low");
      setCategory("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
      flex
      flex-col
      gap-2
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
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className="w-2/3 rounded-md bg-white text-black p-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
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
