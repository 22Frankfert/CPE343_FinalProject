export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: Date;
  priority?: Priority;
}

export type Priority = "low" | "medium" | "high";

export interface TodoService {
  addTodo: (text: string, dueDate?: Date, priority?: Priority) => Promise<void>;
  getTodos: () => Promise<ITodo[]>;
  deleteTodo: (id: number) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
}
