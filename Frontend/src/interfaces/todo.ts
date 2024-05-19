export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoService {
  addTodo: (text: string) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  getTodos: () => Promise<ITodo[]>;
}
