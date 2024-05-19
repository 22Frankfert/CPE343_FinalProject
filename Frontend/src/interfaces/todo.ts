export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoService {
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  getTodos: () => ITodo[];
}
