import * as api from 'todo-api';
import { CommandHandlers } from "../commandHandlers/commandHandlers.js";
import CreateTodo from "../commands/createTodo.js";


type TodoItem = {
  description: string;
  id: number;
  done: boolean;
};

export const addTodoOperationHandler: api.server.AddTodoItemOperationHandler<{}> = async (todo: any) => {
  const createTodoCommand = new CreateTodo(todo.description);
  const commandHandlers = new CommandHandlers();

  const createdTodo = await commandHandlers.createTodo(createTodoCommand);

  const todoItem: TodoItem = {
    description: createdTodo.todoName,
    id: createdTodo.todoId,
    done: createdTodo.todoIsDone,
  };
  return todoItem;
};
