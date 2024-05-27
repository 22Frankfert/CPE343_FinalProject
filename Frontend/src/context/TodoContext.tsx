import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import TodoServiceFactory from "../services/todoservice/TodoServiceFactory";
import { ITodo, TodoService } from "../interfaces/todo";

interface TodoContextProps {
  todos: ITodo[];
  addTodo: (
    text: string,
    dueDate?: Date,
    priority?: "low" | "medium" | "high"
  ) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  // markAllAsCompleted: () => Promise<void>;
  // setUseApi: React.Dispatch<React.SetStateAction<boolean>>;
  handleServiceSwitch: () => void;
  useApi: boolean;
}

interface TodoProviderProps {
  children: ReactNode;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [useApi, setUseApi] = useState(false);
  const todoService: TodoService = TodoServiceFactory.createService(useApi);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await todoService.getTodos();
      setTodos(todos);
    };
    fetchTodos();
  }, [useApi, todoService]);

  const addTodo = async (
    text: string,
    dueDate?: Date,
    priority?: "low" | "medium" | "high"
  ) => {
    await todoService.addTodo(text, dueDate, priority);
    const todos = await todoService.getTodos();
    setTodos([...todos]);
  };

  const toggleTodo = async (id: string) => {
    await todoService.toggleTodo(id);
    const todos = await todoService.getTodos();
    setTodos([...todos]);
  };

  const deleteTodo = async (id: string) => {
    await todoService.deleteTodo(id);
    const todos = await todoService.getTodos();
    setTodos([...todos]);
  };

  const handleServiceSwitch = () => setUseApi(!useApi);

  // const markAllAsCompleted = async () => {
  //   await todoService.markAllAsCompleted();
  //   const todos = await todoService.getTodos();
  //   setTodos(todos);
  // };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        // markAllAsCompleted,
        handleServiceSwitch,
        useApi,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextProps => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
