import { ITodo, Priority, TodoService } from "../../interfaces/todo";

class TodoServiceImpl implements TodoService {
  private todos: ITodo[] = [];

  addTodo = async (
    text: string,
    dueDate?: Date,
    priority?: Priority
  ): Promise<void> => {
    const newTodo: ITodo = {
      id: Date.now().toString(),
      text,
      completed: false,
      dueDate,
      priority,
    };

    this.todos.push(newTodo);
  };

  getTodos = async (): Promise<ITodo[]> => {
    return this.todos;
  };

  deleteTodo = async (id: string): Promise<void> => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };

  toggleTodo = async (id: string): Promise<void> => {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  };
}

export const todoService: TodoService = new TodoServiceImpl();
