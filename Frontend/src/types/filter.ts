import { Todo } from "./todo";

export interface Filter{
    filter: (todos: Todo[])=>Todo[];
}