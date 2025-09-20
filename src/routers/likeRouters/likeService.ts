import {mongoDb} from "../../dataStore/mongoDb";
import {NextFunction, Response} from "express";
import {Like} from "../../types";
import {LoggedInUserRequest} from "../../customTypes/requestTypes";
import {Types} from "mongoose";
import {createLikeBody, deleteLikeBody} from "../../customTypes/validaionTypes";

export const createLike = (db: mongoDb) => {
    return async (req: LoggedInUserRequest, res: Response, next: NextFunction) => {
        try {
            const userData = req.loggedInUser?.userData;
            if (!userData) {
                return res.status(401).json({message: "Not authenticated"});
            }
            const userId: Types.ObjectId = userData._id as Types.ObjectId;
            const {postId}: createLikeBody = req.body;
            const newLike: Like = {
                postId: new Types.ObjectId(postId),
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

export const deleteLike = (db: mongoDb) => {
    return async (req: LoggedInUserRequest, res: Response, next: NextFunction) => {
        try {
            const userData = req.loggedInUser?.userData;
            if (!userData) {
                return res.status(401).json({message: "Not authenticated"});
            }
            const userId: Types.ObjectId = userData._id as Types.ObjectId;
            const {postId}: deleteLikeBody = req.body;
            const likeToDelete: Like = {
                postId: new Types.ObjectId(postId),
                userId
            }
            await db.deleteLike(likeToDelete);
            return res.status(200).json({
                message: "Successfully removed Like"
            })
        } catch (err) {
            next(err)
        }
    }
}