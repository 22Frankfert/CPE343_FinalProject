import { Todo, TodoService } from "../types/todo";

class TodoServiceImpl implements TodoService {
  private todos: Todo[] = [];

  addTodo = (text: string): void => {
    const newTodo: Todo = {
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

  getTodos = (): Todo[] => {
    return this.todos;
  };
}

export const todoService: TodoService = new TodoServiceImpl()
