import {mongoDb} from "../../dataStore/mongoDb";
import {User} from "../../types";
import {NextFunction, Request, Response} from "express";
import userDb from "../../dataStore/mongoDb/collections/userCollection";

export const signupService = (db: mongoDb) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {email, username, firstname, lastname, password} = req.body;
            if (!email || !username || !firstname || !lastname || !password) {
                return res.status(400).json({
                    error: "please fill all fields"
                })
            }
            const newUser: User = {
                email,
                username,
                firstname,
                lastname,
                password
            };
            await db.createUser(newUser);
            res.status(201).json({message: "User created"});
        } catch (err) {
            next(err);
        }

    }
}

export const getUserByEmail = (db: mongoDb) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {email} = req.body;
            if (!email) {
                return res.status(400).json({error: "please enter a email"});
            }
            const userExist = await db.getUserByEmail(email)

            return res.status(200).json({
                email: userExist?.email,
                username: userExist?.username
            })
        } catch (err) {
            next(err)
        }
    }
}

export const updateUser = (db: mongoDb) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData = req.loggedInUser?.userData;
            if (!userData) {
                return res.status(401).json({message: "Not authenticated"});
            }
            const {newUserName, newEmail} = req.body;
            if (!newUserName && !newEmail) {
                return res.status(400).json({error: "please provide at least one field"});
            }
            const newUser = await db.updateUser(userData, newUserName, newEmail);
            return res.status(200).json({message: "User updated"});
        } catch (err) {
            next(err);
        }


    }
}