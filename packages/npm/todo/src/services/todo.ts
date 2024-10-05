import * as shared from "shared";

export interface TodoItem {
  description: string;
  isDone: boolean;
}

export class TodoService {
  private todos = new Map<number, TodoItem>();

  listTodoItems(): Iterable<[number, TodoItem]> {
    return this.todos;
  }

  createTodo(description: string) {
    const id = shared.nextId();

    this.todos.set(id, {
      description,
      isDone: false,
    });

    return id;
  }

  deleteTodoItem(id: number) {
    return this.todos.delete(id);
  }

  setTodoDescription(id: number, description: string) {
    const todoItem = this.todos.get(id);
    if (todoItem == null) {
      return false;
    }

    todoItem.description = description;

    return true;
  }

  markTodoAsDone(id: number) {
    const todoItem = this.todos.get(id);
    if (todoItem == null) {
      return false;
    }

    todoItem.isDone = true;

    return true;
  }
}
