import { mongoDb } from "../../dataStore/mongoDb";
import { NextFunction, Request, Response } from "express";
import { Comment } from "../../types";
import { LoggedInUserRequest } from "../../customTypes/requestTypes";
import { Types } from "mongoose";

export const createCommentService = (db: mongoDb) => {
    return async (req: LoggedInUserRequest, res: Response, next: NextFunction) => {
        try {
            const userData = req.loggedInUser?.userData;
            if (!userData) {
                return res.status(401).json({ message: "Not authenticated" });
            }
            const userId: Types.ObjectId = userData._id as Types.ObjectId;
            const { title, postId } = req.body;
            if (!title || !postId) {
                return res.status(400).json({
                    error: "please fill all the required fields"
                });
            }
            const newComment: Comment = {
                title,
                postId,
                userId
            }
            await db.createComment(newComment);
            return res.status(200).json({
                message: "Successfully created Comment"
            })
        } catch (error) {
            next(error);
        }
    }
}
export const deleteCommentService = (db: mongoDb) => {
    return async (req: LoggedInUserRequest, res: Response, next: NextFunction) => {
        try {
            const userData = req.loggedInUser?.userData;
            if (!userData) {
                return res.status(401).json({ message: "Not authenticated" });
            }
            
            const { commentId } = req.body;
            if (!commentId) {
                return res.status(400).json({
                    error: "Comment ID is required"
                });
            }

            await db.deleteComment(commentId);
            return res.status(200).json({
                message: "Successfully deleted comment"
            });
        } catch (error) {
            next(error);
        }
    }
}
export const listCommentsService = (db: mongoDb) => {
    return async (req: LoggedInUserRequest, res: Response, next: NextFunction) => {
        try {
            const userData = req.loggedInUser?.userData;
            if (!userData) {
                return res.status(401).json({ message: "Not authenticated" });
            }
            const { postId } = req.body;
            if (!postId) {
                return res.status(400).json({
                    error: "Post ID is required"
                });
            }
            const comments = await db.listComments(postId);
            return res.status(200).json({
                comments
            });
        } catch (error) {
            next(error);
        }
    }
}