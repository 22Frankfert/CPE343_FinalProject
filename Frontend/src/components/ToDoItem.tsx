import Item from "../model/ItemModel";

interface ToDoItemProps {
  item: Item;
}

const ToDoItem = ({ item }: ToDoItemProps) => {
  return (
    <div className="flex flex-col p-2 border-2 rounded-lg ">
      <p className="font-semibold text-xl">{item.name}</p>
      <p className="">{item.tag}</p>
    </div>
  );
};

export default ToDoItem;
