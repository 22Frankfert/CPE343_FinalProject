//Waiting for API structure from backend
/////

import { ITodo, Priority, TodoService } from "../../interfaces/todo";

class TodoApiService implements TodoService {
  private todos: ITodo[] = [];

  addTodo = async (
    text: string,
    priority: Priority,
  ): Promise<void> => {
    const newTodo: ITodo = {
      id: Date.now(),
      text,
      completed: false,
      priority,
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
  ): Promise<void> => {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, text, priority } : todo
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

export const todoApiService: TodoService = new TodoApiService();
