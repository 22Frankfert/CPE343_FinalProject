import React from "react";
import Item from "../model/ItemModel";

interface ToDoItemProps {
  item: Item
}

const ToDoItem = ({ item }: ToDoItemProps) => {
  return (
    <div>
      <div>{item.name}</div>
      <div>Test</div>
    </div>
  );
};

export default ToDoItem;
