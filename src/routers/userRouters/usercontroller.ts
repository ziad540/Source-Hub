import {mongoDb} from "../../dataStore/mongoDb";
import {Router} from "express";
import {getUserByEmail, signupService, updateUser} from "./userService";
import {authenticationMiddleware} from "../../middleware/authentication.middleware";

export const usercontroller = (db: mongoDb) => {
    const router = Router();

    router.post('/signUp', signupService(db))
    router.get('/userBy_email', getUserByEmail(db))
    router.post('/update_user', authenticationMiddleware, updateUser(db))


    return router
}