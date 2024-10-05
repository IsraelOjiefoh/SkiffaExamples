import * as assert from "node:assert";
import test from "node:test";
import * as api from "todo-api";
import { createContext } from "../context.js";
import {
  addTodoItem,
  deleteTodoItem,
  listTodoItems,
  setTodoDescription,
  todoItemSetDone,
} from "./todo.js";

test("todo test scenario", async () => {
  const context = createContext();

  // Start the server once
  const server = new api.server.Server();

  // Register the operations
  server.registerAddTodoItemOperation(addTodoItem(context));
  server.registerListTodoItemsOperation(listTodoItems(context));
  server.registerSetTodoItemDescriptionOperation(setTodoDescription(context));
  server.registerDeleteTodoItemOperation(deleteTodoItem(context));
  server.registerTodoItemSetDoneOperation(todoItemSetDone(context));

  await using listener = await api.lib.listen(server);
  const baseUrl = new URL(`http://localhost:${listener.port}`);

  let id: number

  await test("list (expect empty list)", async () => {
    const listTodo = await api.client.listTodoItems({ baseUrl });

    assert.deepEqual(listTodo, []);
  });

  await test("create a todo item", async () => {
    id = await api.client.addTodoItem({ description: "Go to work" }, { baseUrl });
  });

  await test("list (expect 1 item in list)", async () => {
    const listTodo = await api.client.listTodoItems({ baseUrl });

    assert.equal(listTodo.length, 1);
    assert.equal(listTodo[0].description, "Go to work");
  });

  await test("update the todo item", async () => {
    await api.client.setTodoItemDescription({ id }, "Go to the gym", { baseUrl });
  });

  await test("list (expect 1 updated item in list)", async () => {
    const listTodo = await api.client.listTodoItems({ baseUrl });

    assert.equal(listTodo.length, 1);
    assert.equal(listTodo[0].description, "Go to the gym");
  });

  await test("set-done the todo item", async () => {
    await api.client.todoItemSetDone({ id }, { baseUrl });
  });

  await test("list (expect 1 done item in list)", async () => {
    const listTodo: { id: number; description: string; done: boolean }[] =
      await api.client.listTodoItems({ baseUrl });

    assert.equal(listTodo.length, 1);
    assert.equal(listTodo[0].done, true);
  });

  await test("delete the todo item", async () => {
    await api.client.deleteTodoItem({ id }, { baseUrl });
  });

  await test("list (expect empty list)", async () => {
    const listTodo: { id: number; description: string; done: boolean }[] =
      await api.client.listTodoItems({ baseUrl });

    assert.deepEqual(listTodo, []);
  });
});
