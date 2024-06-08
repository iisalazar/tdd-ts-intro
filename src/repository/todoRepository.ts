import {Todo} from "../models/Todo";
import {Db, ObjectId} from "mongodb";

export interface ITodoRepository {
    getTodos(): Promise<Todo[]>;
    addTodo(todo: Todo): Promise<void>;
    deleteTodoById(id: string): Promise<void>;
}

export class TodoRepository implements ITodoRepository {
    private readonly db: Db;
    constructor(db: Db) {
        this.db = db;
    }
    async getTodos(): Promise<Todo[]> {
        const result = await this.db.collection("todos").find().toArray();
        return result.map((x: any) => new Todo(x._id, x.title, x.completed));
    }
    
    async addTodo(todo: Todo): Promise<void> {
        await this.db.collection("todos").insertOne({
            title: todo.title,
            completed: todo.completed
        });
    }
    
    async deleteTodoById(id: string): Promise<void> {
        await this.db.collection("todos").deleteOne({ _id: new ObjectId(id)
        });
    }
    
}