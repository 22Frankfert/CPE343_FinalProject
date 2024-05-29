import { TodoService } from "../../interfaces/todo";
import { localTodoService } from "./LocalDbService";
import { inMemoryTodoService } from "./InMemoryService";

class TodoServiceFactory {
  static createService(useApi: boolean): TodoService {
    return useApi ? localTodoService : inMemoryTodoService;
  }
}

export default TodoServiceFactory;
