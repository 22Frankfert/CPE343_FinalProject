import { ITodo, TodoService } from "../interfaces/todo";

class TodoServiceImpl implements TodoService {
  private todos: ITodo[] = [];

  addTodo = (text: string): void => {
    const newTodo: ITodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    this.todos.push(newTodo);
  };

  toggleTodo = (id: number): void => {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  };

  deleteTodo = (id: number): void => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };

  getTodos = (): ITodo[] => {
    return this.todos;
  };
}

export const todoService: TodoService = new TodoServiceImpl();
