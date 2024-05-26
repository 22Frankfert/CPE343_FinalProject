import { Filter } from "../../interfaces/filter";
import { ITodo } from "../../interfaces/todo";

export class PendingFilter implements Filter {
  filter(todos: ITodo[]): ITodo[] {
    return todos.filter((todo) => !todo.completed);
  }
}
