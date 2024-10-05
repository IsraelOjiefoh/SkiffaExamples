import * as api from "todo-api";
import { Context } from "../context.js";

export const listTodoItems =
  (context: Context): api.server.ListTodoItemsOperationHandler<{}> =>
  async () => {
    return [...context.todo.listTodoItems()].map(([id, { description, isDone }]) => ({
      id,
      description,
      done: isDone,
    }));
  };

export const addTodoItem =
  (context: Context): api.server.AddTodoItemOperationHandler<{}> =>
  async ({ description }) => {
    const id = context.todo.createTodo(description);

    return id;
  };

export const deleteTodoItem =
  (context: Context): api.server.DeleteTodoItemOperationHandler<{}> =>
  async (todo) => {
    if (!context.todo.deleteTodoItem(todo.id)) {
      return 404;
    }
    return 204;
  };

export const setTodoDescription =
  (context: Context): api.server.SetTodoItemDescriptionOperationHandler<{}> =>
  async ({ id }, description) => {
    if (!context.todo.setTodoDescription(id, description)) {
      throw 404;
    }

    return 204;
  };

export const todoItemSetDone =
  (context: Context): api.server.TodoItemSetDoneOperationHandler<{}> =>
  async (todo) => {
    if (!context.todo.markTodoAsDone(todo.id)) {
      return 404;
    }

    return 204;
  };
