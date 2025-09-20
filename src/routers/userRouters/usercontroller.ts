import {mongoDb} from "../../dataStore/mongoDb";
import {Router} from "express";
import {getUserByEmail, signInService, signupService, updateUser} from "./userService";
import {authenticationMiddleware} from "../../middleware/authentication.middleware";
import {validationMiddleware} from "../../middleware/validation.middleware";
import {
    getUserByEmailValidator,
    signInValidator,
    signUpValidator,
    updateUserValidator
} from "../../validator/user.validator";

export const userController = (db: mongoDb) => {
    const router = Router();

    router.post('/signUp', validationMiddleware(signUpValidator), signupService(db))
    router.get('/userBy_email', validationMiddleware(getUserByEmailValidator), authenticationMiddleware, getUserByEmail(db))
    router.post('/update_user', validationMiddleware(updateUserValidator),authenticationMiddleware, updateUser(db))
    router.post('/singIn', validationMiddleware(signInValidator), signInService(db))


    return router
}