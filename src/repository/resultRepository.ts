import {IDatabase} from "../database";

export interface IResultRepository {
    saveResult(result: number): Promise<void>;
}

class ResultRepository implements IResultRepository {
    private db: IDatabase;
    
    constructor({
                    _db
                }: { _db: IDatabase}) {
        this.db = _db;
    }
    async saveResult(result: number) {
        // Save the result
        await this.db.runQuery(`INSERT INTO results (result) VALUES (${result})`);
    }
}

export default ResultRepository;