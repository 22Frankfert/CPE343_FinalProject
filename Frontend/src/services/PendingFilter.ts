import { Todo } from "../types/todo";
import { Filter } from "../types/filter";

export class PendingFilter implements Filter {
    filter(todos: Todo[]): Todo[] {
      return todos.filter(todo => !todo.completed);
    }
  }