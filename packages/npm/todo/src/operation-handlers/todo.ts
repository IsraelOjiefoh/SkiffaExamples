import * as api from "todo-api";
import { CommandHandlers } from "../commandHandlers/commandHandlers.js";
import { QueryHandler } from "../queryHandler/queryHandler.js";

import CreateTodo from "../commands/createTodo.js";
import DeleteTodo from "../commands/deleteTodo.js";
import updateTodo from "../commands/updateTodo.js";
import listTodoItems from "../query/listTodoItems.js";

export const addTodoItem: api.server.AddTodoItemOperationHandler<{}> = async (todo) => {
  const createTodoCommand = new CreateTodo(todo.description);
  const commandHandlers = new CommandHandlers();

  const createdTodo = await commandHandlers.createTodo(createTodoCommand);

  const todoItem = {
    description: createdTodo.todoName,
    id: createdTodo.todoId,
    done: createdTodo.todoIsDone,
  };

  return todoItem;
};

export const modifyTodoItem: api.server.ModifyTodoItemOperationHandler<{}> = async (todo) => {
  const updateTodoCommand = new updateTodo(todo.id);
  const commandHandlers = new CommandHandlers();

 const updatedTodo = await commandHandlers.updateTodo(updateTodoCommand);

  const todoItem = {
    description: updatedTodo.todoName,
    id: updatedTodo.todoId,
    done: updatedTodo.todoIsDone,
  };
  return todoItem;
};


export const listTodoItem: api.server.ListTodoItemsOperationHandler<{}> = async (todo) => {
  
  const listTodoQuery = new listTodoItems(todo)
  const listTodoHandlers = new QueryHandler();

 const listTodo = await listTodoHandlers.listTodoItems(listTodoQuery);

 // Not returning anything because of the issue i have with the todo parameter returning any
  // const todoItem = {
  //   description: listTodo.todoName,
  //   id: updatedTodo.todoId,
  //   done: updatedTodo.todoIsDone,
  // };
  // return todoItem;
};


export const deleteTodoItem:api.server.DeleteTodoItemOperationHandler<{}>= async(todo)=>{

  const deleteTodoCommand = new DeleteTodo(todo.id)
  const deleteTodoHandler = new CommandHandlers()

  const deletedTodo = deleteTodoHandler.deleteTodoItem(deleteTodoCommand)

  return deletedTodo
}