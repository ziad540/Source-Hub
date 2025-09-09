import {NextFunction, Request, Response} from "express";
import {mongoDb} from "../../dataStore/mongoDb";
import {Post} from "../../types";
import {Types} from 'mongoose';
import {LoggedInUserRequest} from "../../customTypes/requestTypes";

export const createPostService = (db: mongoDb) => {
    return async (req: LoggedInUserRequest, res: Response, next: NextFunction) => {
        try {
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
            return res.status(201).json({
                message: "Post successfully created"
            })
        } catch (error) {
            next(error);
        }

    }
}

export const getPostById = (db: mongoDb) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {PostId} = req.body;
            if (!PostId) {
                return res.status(400).json({
                    error: "please fill all the required fields"
                })
            }
            const postExist = await db.getPostById(PostId);
            return res.status(200).json({
                Title: postExist?.title,
                Url: postExist?.url,
            });
        } catch (err) {
            next(err);
        }
    }
}

export const listPosts = (db: mongoDb) => {
    return async (req: LoggedInUserRequest, res: Response, next: NextFunction) => {
        try {
            const userData = req.loggedInUser?.userData;
            if (!userData) {
                return res.status(401).json({message: "Not authenticated"});
            }
            const userId: Types.ObjectId = userData._id as Types.ObjectId;

            const posts = await db.listPosts(userId);
            return res.status(200).json({
                Posts:posts,
            });
        } catch (error) {
            next(error);
        }

    }
}