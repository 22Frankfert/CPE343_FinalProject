import { TodoService } from "../../interfaces/todo";
import { localTodoService } from "./TodoApiService";
import { inMemoryTodoService } from "./TodoService";

class TodoServiceFactory {
  static createService(useApi: boolean): TodoService {
    return useApi ? localTodoService : inMemoryTodoService;
  }
}

export default TodoServiceFactory;
