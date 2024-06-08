export interface IDatabase {
    runQuery(query: string): Promise<void>;
}
class Database implements IDatabase {
    async runQuery(query: string) {
        // Run the query
    }
}

export default Database;