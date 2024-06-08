import App from "./app";  
import connectToDb from "./database";


connectToDb()
    .then(db => {
        if(!db) {
            throw new Error("Database not set");
        }
        const app = new App(db);
        app.start();
    })
    .catch(error => {
        console.error("Error while connecting to the database", error);
    });