import { IoMdAdd } from "react-icons/io";

const AddItem = () => {
  return (
    <button
      className="
    flex p-2 border-2 rounded-full hover:opacity-90 bg-white shadow-md
    "
    >
      <IoMdAdd size={24}/>
    </button>
  );
};

export default AddItem;
