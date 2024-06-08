import express from "express";
import {createTodoRoutes} from "./routes";
import {Db} from "mongodb"; 
export class App {
    public app: express.Express;
    public port: number;
    private readonly db: Db;

    constructor(db: Db) {
        this.db = db;
        this.app = express();
        this.port = this.getPort();

        this.configureServer();
        this.configureRoutes();
    }
    


    private getPort = (): number => +process.env.PORT! || 8081; 
    
    private configureServer = (): void => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    
    private configureRoutes = (): void => {
        if (!this.db) {
            throw new Error("Database not set");
        }
        this.app.use("/todos", createTodoRoutes(this.db));
        this.app.get("/", (req, res) => {
            res.send("Hello World!");
        });
    }
    
    public start = (): void => {
        this.app.listen(this.port, () => {
            console.log(`Server started at http://localhost:${this.port}`);
        });
    }
}

export default App;