//command handler for all commands

export const todos = new Map<number, { todoName: string; todoId: number; todoIsDone: boolean }>();
export class CommandHandlers {

  async createTodo(command: { todoName: string }) {
    //generate a unique id for each todo
    const generateId = (): number => {
      return Math.floor(100000 + Math.random() * 900000);
    };

    const todoId: number = generateId();
    const todoIsDone: boolean = false;

    //create the todo items
    const todo = {
      todoName: command.todoName,
      todoId,
      todoIsDone,
    };

    todos.set(todoId, todo);
    return todo;   
  }


  async updateTodo(command: {todoId: number, todoName:string}){
    const {todoId, todoName}= command;
    const todoToUpdate = todos.get(todoId);
    
     
    if(todos.has(todoId)){

      if(todoToUpdate){
        todoToUpdate.todoName = todoName;

        todos.set(todoId,todoToUpdate )

      }
    }
    return todoToUpdate
  }

}
