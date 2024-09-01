import * as api from "todo-api";
import { CommandHandlers } from "../commandHandlers/commandHandlers.js";
 
import CreateTodo from "../commands/createTodo.js";
import DeleteTodo from "../commands/deleteTodo.js";
import todoIsDone from "../commands/todoIsDone.js";
import updateTodo from "../commands/updateTodo.js";

 
export const ListTodoItems: api.server.ListTodoItemsOperationHandler<{}> = async () => {
  const commandHandler = new CommandHandlers();
  return await commandHandler.listTodoItems();
};

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

export const deleteTodoItem: api.server.DeleteTodoItemOperationHandler<{}> = async (todo) => {
  const deleteTodoCommand = new DeleteTodo(todo.id);
  const deleteTodoHandler = new CommandHandlers();

  deleteTodoHandler.deleteTodoItem(deleteTodoCommand);
};

export const todoItemSetDone: api.server.TodoItemSetDoneOperationHandler<{}> = async (todo) => {
  const isDoneCommand = new todoIsDone(todo.id)
  const isDoneHandler = new CommandHandlers()

    const isDone = isDoneHandler.markTodoAsDone(isDoneCommand)

    const todoItem = {
      description: isDone.todoName,
      id: isDone.todoId,
      done: isDone.todoIsDone,
    };
    return todoItem;
    
};
