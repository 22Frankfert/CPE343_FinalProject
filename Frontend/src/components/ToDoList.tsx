import React from "react";
import { Todo } from "../types/todo";
import ToDoItem from "./ToDoItem";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const ToDoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
}) => {
  // items dummy
  // const listItems = [1, 2, 3, 4, 5];

  return (
    <>
      <div className="flex flex-col p-4 gap-4 w-1/3">
        {/* {listItems.length > 0
          ? listItems.map((item) => <ToDoItem key={item} item={item} />)
          : "Nothing to do yet!"} */}
        {todos.length > 0 ? (
          todos.map((todo) => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))
        ) : (
          <span
            className="
            text-center
            text-xl
            text-white
            font-semibold
          "
          >
            Nothing to do yet!
          </span>
        )}
      </div>
    </>
  );
};

export default ToDoList;