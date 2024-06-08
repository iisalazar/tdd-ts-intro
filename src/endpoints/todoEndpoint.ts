import { Request, Response, NextFunction } from "express";
import {ITodoRepository} from "../repository/todoRepository";
import {Todo} from "../models/Todo";

export interface ITodoEndpoint {
    getTodos(req: Request, res: Response,  next?: NextFunction): Promise<any>;
    addTodo(req: Request, res: Response, next?: NextFunction): Promise<any>;
    deleteTodoById(req: Request, res: Response, next?: NextFunction): Promise<any>;
}

export class TodoEndpoint implements ITodoEndpoint {
    private readonly todoRepository: ITodoRepository;
    constructor({
        todoRepository
                }: { todoRepository: ITodoRepository}) {
        this.todoRepository = todoRepository;
        this.getTodos = this.getTodos.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.deleteTodoById = this.deleteTodoById.bind(this);
    } 
    async getTodos(req: Request, res: Response, next?: NextFunction): Promise<any> {
        const todos = await this.todoRepository.getTodos();
        res.json(todos);
    }
    async addTodo(req: Request, res: Response, next?: NextFunction): Promise<any> {
        // auth checks
        // validation
        const { title, completed } = req.body;
        if (!title){
            res.status(400).send("Title is required");
            return;
        }
        const todo = new Todo("", title, completed);
        // sanitization
        await this.todoRepository.addTodo(todo);
        // other side effects i.e. push notifications
        res.status(201).send("OK")
    }
    async deleteTodoById(req: Request, res: Response, next?: NextFunction): Promise<any> {
        const { id } = req.params;
        await this.todoRepository.deleteTodoById(id);
        res.send("OK");
    }
}

