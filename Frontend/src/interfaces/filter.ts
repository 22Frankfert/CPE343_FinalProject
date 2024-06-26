import { ITodo } from "./todo";

export interface Filter{
    filter: (todos: ITodo[])=>ITodo[];
}

export type FilterType = "all" | "completed" | "pending"