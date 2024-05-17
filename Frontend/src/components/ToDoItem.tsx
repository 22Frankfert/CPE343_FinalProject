import DeleteItem from "./DeleteItem";
import EditItem from "./EditItem";

interface ToDoItemProps {
  item: number;
}

const ToDoItem = ({ item }: ToDoItemProps) => {
  return (
    <div className="flex p-2 border-2 rounded-lg justify-between ">
      <div className="flex flex-col">
        <p className="font-semibold text-xl">Item #{item}</p>
        <p className="">Name {item}</p>
        <p className="">Color {item}</p>
      </div>
      <div className="flex flex-col justify-center gap-2">
        <EditItem />
        <DeleteItem />
      </div>
    </div>
  );
};

export default ToDoItem;
