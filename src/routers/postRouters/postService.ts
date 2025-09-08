import {NextFunction, Request, Response} from "express";
import {mongoDb} from "../../dataStore/mongoDb";
import {Post} from "../../types";
import {Types} from 'mongoose';
import {LoggedInUserRequest} from "../../customTypes/requestTypes";

export const createPostService = (db: mongoDb) => {
    return async (req: LoggedInUserRequest, res: Response, next: NextFunction) => {
        const userData = req.loggedInUser?.userData;
        if (!userData) {
            return res.status(401).json({message: "Not authenticated"});
        }
        const userId: Types.ObjectId = userData._id as Types.ObjectId;
        const {title, url} = req.body;
        if (!title || !url) {
            return res.status(400).json({
                error: "please fill all the required fields"
            });
        }
        const newPost: Post = <Post>{
            title,
            url,
            userId,
        }
        await db.createPost(newPost)

    }
}