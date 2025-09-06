import express from 'express';
import 'dotenv/config'
import {mongoDb} from "./dataStore/mongoDb";
import {usercontroller} from "./routers/userRouters/usercontroller";
import {errorHandlingMiddleware} from "./middleware/errorHandling.middleware";


(async () => {
    const app = express();
    const db = await new mongoDb().createDataBase();
    console.log("DataBase connected successfully.");
    app.use(express.json());
    app.use('/user', usercontroller(db))

    app.use(errorHandlingMiddleware);




    app.listen(3000, () => console.log('Server is running on port 3000'));
})();
