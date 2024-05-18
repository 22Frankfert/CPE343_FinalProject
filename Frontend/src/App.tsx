import { useEffect, useState } from "react";
import AddItem from "./components/AddItem";
import ToDoList from "./components/ToDoList";
import { Todo } from "./types/todo";
import { todoService } from "./services/TodoService";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const todoServ = todoService;

  useEffect(() => {
    setTodos(todoServ.getTodos());
  }, []);

  const addTodo = (text: string) => {
    todoServ.addTodo(text);
    setTodos([...todoServ.getTodos()]);
  };

  const toggleTodo = (id: number) => {
    todoServ.toggleTodo(id);
    setTodos([...todoServ.getTodos()]);
  };

  const deleteTodo = (id: number) => {
    todoServ.deleteTodo(id);
    setTodos([...todoServ.getTodos()]);
  };

  return (
    <>
      <div
        className="
        h-screen
        flex
        flex-col
        items-center
        p-24
        bg-slate-600
        gap-4"
      >
        {/* Children here */}
        <div className="font-bold text-center text-3xl text-white">
          To-Do-List
        </div>
        <div className="border-2 w-1/3"/>
        {/* Add */}
        <AddItem addTodo={addTodo} />
        {/* Show List */}
        <ToDoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </>
  );
}

export default App;
