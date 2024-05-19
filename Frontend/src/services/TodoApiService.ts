//Waiting for API structure from backend
/////

import { ITodo, TodoService } from "../interfaces/todo";

class TodoApiService implements TodoService {
  private todos: ITodo[] = [];

  addTodo = async (text: string): Promise<void> => {
    const newTodo: ITodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    this.todos.push(newTodo);
  };

  toggleTodo = async (id: number): Promise<void> => {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  };

  deleteTodo = async (id: number): Promise<void> => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };

  getTodos = async (): Promise<ITodo[]> => {
    return this.todos;
  };
}

export const todoApiService: TodoService = new TodoApiService();
