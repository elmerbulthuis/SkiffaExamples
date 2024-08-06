import * as api from "todo-api";

import { CommandHandlers } from "../commandHandlers/commandHandlers";
import CreateTodo from "../commands/createTodo";

export const addTodoOperationHandler: api.server.AddTodoItemOperationHandler<{}> = async (todo: string) => {
    const createTodoCommand = new CreateTodo(todo);
    const commandHandlers = new CommandHandlers();

    await commandHandlers.createTodo(createTodoCommand);
};
