import { Router} from "express";
import { ITodoEndpoint, TodoEndpoint } from "./endpoints/todoEndpoint";
import { TodoRepository } from "./repository/todoRepository";
import {Db} from "mongodb";
export const createRoutes = (todoEndpoint: ITodoEndpoint): Router => {
    const router = Router();
    router.get("/", todoEndpoint.getTodos);
    router.post("/", todoEndpoint.addTodo);
    router.delete("/:id", todoEndpoint.deleteTodoById);
    return router;
}

export const createTodoRoutes = (db: Db): Router => {
    const todoRepository = new TodoRepository(db)
    const todoEndpoint = new TodoEndpoint({ todoRepository });
    return createRoutes(todoEndpoint);
}



