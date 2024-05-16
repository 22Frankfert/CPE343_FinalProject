import ToDoItem from "./ToDoItem";
import Item from "../model/ItemModel";

const ToDoList = () => {
  // items dummy
  // const listItems = [1, 2, 3, 4];
  const listClassItems = [
    new Item("Item 1", "task"), //In this declaration we can use abstract class for "tag"
    new Item("Item 2", "Some Date"),
    new Item("Item 3", "random"),
    new Item("Item 4", "temp"),
  ];
  console.log(listClassItems);

  return (
    <>
      <div>ToDoList</div>
      {listClassItems.map((item) => (
        <ToDoItem key={item.name} item={item} />
      ))}
    </>
  );
};

export default ToDoList;
