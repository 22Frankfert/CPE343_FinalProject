import { ILocalService } from "../../interfaces/db";
import { ITodo, Priority, TodoService } from "../../interfaces/todo";

class LocalDbService implements TodoService, ILocalService {
  route = "http://localhost:3000/todo";

  addTodo = async (
    text: string,
    dueDate?: Date,
    priority?: Priority
  ): Promise<void> => {
    const newTodo = {
      text,
      completed: false,
      dueDate,
      priority,
    };
    await fetch(this.route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
  };

  getTodos = async (): Promise<ITodo[]> => {
    const response = await fetch(this.route);
    const todos = await response.json();
    return todos.map((todo: ITodo) => ({
      ...todo,
      dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
    }));
  };

  deleteTodo = async (id: string): Promise<void> => {
    await fetch(`${this.route}/${id}`, {
      method: "DELETE",
    });
  };

  toggleTodo = async (id: string): Promise<void> => {
    const todo = await this.getTodoById(id);
    await fetch(`${this.route}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !todo.completed }),
    });
  };

  private async getTodoById(id: string): Promise<ITodo> {
    const response = await fetch(`${this.route}/${id}`);
    const todo = await response.json();
    return {
      ...todo,
      dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
    };
  }
}

export const localTodoService: TodoService = new LocalDbService();
