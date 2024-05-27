export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: Date;
  priority?: Priority;
}

export type Priority = "low" | "medium" | "high";

export interface TodoService {
  addTodo: (text: string, dueDate?: Date, priority?: Priority) => Promise<void>;
  getTodos: () => Promise<ITodo[]>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
}
