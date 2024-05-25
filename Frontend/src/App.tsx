import { useEffect, useState } from "react";
import AddItem from "./components/AddItem";
import ToDoList from "./components/ToDoList";
import { ITodo } from "./interfaces/todo";
import TodoServiceFactory from "./services/TodoServiceFactory";
import { Filter } from "./types/filter";
import { CompletedFilter } from "./services/CompletedFilter";
import { PendingFilter } from "./services/PendingFilter";

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [useApi, setUseApi] = useState(false);
  const todoService = TodoServiceFactory.createService(useApi);
  const [filter, setFilter] = useState<Filter>(new CompletedFilter());

  useEffect(() => {
    async function fetchTodos() {
      const todos = await todoService.getTodos();
      setTodos(todos);
    }

    fetchTodos();
  }, [useApi, todoService]);

  const addTodo = async (text: string) => {
    await todoService.addTodo(text);
    const todos = await todoService.getTodos();
    setTodos([...todos]);
  };

  const toggleTodo = async (id: number) => {
    await todoService.toggleTodo(id);
    const todos = await todoService.getTodos();
    setTodos([...todos]);
  };

  const deleteTodo = async (id: number) => {
    await todoService.deleteTodo(id);
    const todos = await todoService.getTodos();
    setTodos([...todos]);
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
        <div className="flex flex-col gap-2">
          <span className="text-white">
            Current Service: {useApi ? "Database" : "Local"}
          </span>
          <button
            onClick={() => setUseApi(!useApi)}
            className="
              p-2
              rounded-md
              bg-white
              hover:bg-neutral-300
            "
          >
            {useApi ? "Use Local Todo" : "Use Database Todo"}
          </button>
        </div>
        <button onClick={() => handleFilterChange(true)}>Show Completed</button>
        <button onClick={() => handleFilterChange(false)}>Show Pending</button>
        <div className="border-2 w-1/3" />
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
