import ToDoItem from "./ToDoItem";
import Item from "../model/ItemModel";

const ToDoList = () => {
  
  // items dummy
  const listClassItems = [
    new Item("Item 1", "task"), //In this declaration we can use abstract class for "tag"
    new Item("Item 2", "Some Date"),
    new Item("Item 3", "random"),
    new Item("Item 4", "temp"),
  ];

  return (
    <>
      <div className="flex flex-col p-4 border-2 gap-4 w-1/3">
        {listClassItems.map((item) => (
          <ToDoItem key={item.name} item={item} />
        ))}
      </div>
    </>
  );
};

export default ToDoList;
