import {mongoDb} from "../../dataStore/mongoDb";
import {Router} from "express";
import {getUserByEmail, signupService} from "./userService";

export const usercontroller = (db: mongoDb) => {
    const router = Router();

    router.post('/signUp', signupService(db))
    router.get('/userBy_email', getUserByEmail(db))


    return router
}