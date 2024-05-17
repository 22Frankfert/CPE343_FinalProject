import { FaTrash } from "react-icons/fa6"


const DeleteItem = () => {
  return (
    <button
      className="
      flex
      items-center
      justify-center
      p-2
      rounded-md
      text-red-500
      hover:bg-neutral-300
    "
    >
      <FaTrash size={20}/>
    </button>
  )
}

export default DeleteItem