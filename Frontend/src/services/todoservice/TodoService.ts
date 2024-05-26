import { ITodo, Priority, TodoService } from "../../interfaces/todo";

class TodoServiceImpl implements TodoService {
  private todos: ITodo[] = [];

  addTodo = async (
    text: string,
    priority: Priority,
    category: string
  ): Promise<void> => {
    const newTodo: ITodo = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      category,
    };

    this.todos.push(newTodo);
  };

  getTodos = async (): Promise<ITodo[]> => {
    return this.todos;
  };

  updateTodo = async (
    id: number,
    text: string,
    priority: Priority,
    category: string
  ): Promise<void> => {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, text, priority, category } : todo
    );
  };

  deleteTodo = async (id: number): Promise<void> => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };

  toggleTodo = async (id: number): Promise<void> => {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  };
}

export const todoService: TodoService = new TodoServiceImpl();
