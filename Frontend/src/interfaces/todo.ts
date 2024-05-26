export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
  category: string;
}

export type Priority = "low" | "medium" | "high";

export interface TodoService {
  addTodo: (
    text: string,
    priority: Priority,
    category: string
  ) => Promise<void>;
  getTodos: () => Promise<ITodo[]>;
  updateTodo: (
    id: number,
    text: string,
    priority: Priority,
    category: string
  ) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
}
