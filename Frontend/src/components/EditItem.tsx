import { FiEdit } from "react-icons/fi";

const EditItem = () => {
  return (
    <button
      className="
      flex
      items-center
      justify-center
      p-2
      rounded-md
      hover:bg-neutral-300
    "
    >
      <FiEdit size={20}/>
    </button>
  );
};

export default EditItem;
