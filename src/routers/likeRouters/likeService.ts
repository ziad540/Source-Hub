import {mongoDb} from "../../dataStore/mongoDb";
import {NextFunction, Response} from "express";
import {Like} from "../../types";
import {LoggedInUserRequest} from "../../customTypes/requestTypes";
import {Types} from "mongoose";

export const createLike = (db: mongoDb) => {
    return async (req: LoggedInUserRequest, res: Response, next: NextFunction) => {
        try {
            const userData = req.loggedInUser?.userData;
            if (!userData) {
                return res.status(401).json({message: "Not authenticated"});
            }
            const userId: Types.ObjectId = userData._id as Types.ObjectId;
            const {postId} = req.body;
            if (!postId) {
                return res.status(400).json({
                    error: 'Missing postId'
                })
            }
            const newLike: Like = {
                postId,
                userId
            }
            await db.createLike(newLike);
            return res.status(200).json({
                message: "Successfully created Like"
            })
        } catch (err) {
            next(err)
        }
    }
}