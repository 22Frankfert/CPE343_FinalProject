import { TodoService } from '../interfaces/todo';
import { todoApiService } from './TodoApiService';
import { todoService } from './TodoService';

class TodoServiceFactory {
  static createService(useApi: boolean): TodoService {
    return useApi ? todoApiService : todoService;
  }
}

export default TodoServiceFactory;