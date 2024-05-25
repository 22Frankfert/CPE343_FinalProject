import { useEffect, useState } from "react";
import AddItem from "./components/AddItem";
import ToDoList from "./components/ToDoList";
import { Todo } from "./types/todo";
import { todoService } from "./services/TodoService";
import { Filter } from "./types/filter";
import { CompletedFilter } from "./services/CompletedFilter";
import { PendingFilter } from "./services/PendingFilter";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const todoServ = todoService;
  const [filter, setFilter] = useState<Filter>(new CompletedFilter());

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
  const handleFilterChange = (completed: boolean) => {
    setFilter(completed ? new CompletedFilter() : new PendingFilter()); // Change filter strategy based on user input
  };

  return (
    <>
      <div
        className="
        min-h-screen
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
        <button onClick={() => handleFilterChange(true)}>Show Completed</button>
        <button onClick={() => handleFilterChange(false)}>Show Pending</button>
        {/* Add */}
        <AddItem addTodo={addTodo} />
        {/* Show List */}
        <ToDoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          filter={filter}
        />
      </div>
    </>
  );
}

export default App;
