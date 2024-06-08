import {MongoClient, ServerApiVersion} from "mongodb";
async function createDatabaseConnection() {
    const uri = "";

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    try {
        await client.connect();
        const db = client.db("test");
        await db.command({ ping: 1 });
        return db;
    } catch (error) {
        console.error("Error while connecting to the database", error);
        await client.close();   
    }
}
export default createDatabaseConnection;