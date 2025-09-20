import {NextFunction, Request, Response} from "express";
import {mongoDb} from "../../dataStore/mongoDb";
import {Post} from "../../types";
import {Types} from 'mongoose';
import {LoggedInUserRequest} from "../../customTypes/requestTypes";
import {
    createPostBody,
    editPostBody,
    filterByTagBody,
    getPostByIdBody,
    searchPostsBody
} from "../../customTypes/validaionTypes";

export const createPostService = (db: mongoDb) => {
    return async (req: LoggedInUserRequest, res: Response, next: NextFunction) => {
        try {
            const userData = req.loggedInUser?.userData;
            if (!userData) {
                return res.status(401).json({message: "Not authenticated"});
            }
            const userId: Types.ObjectId = userData._id as Types.ObjectId;
            const {title, url}: createPostBody = req.body;
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
            const {PostId}: getPostByIdBody = req.body;
            if (!PostId) {
                return res.status(400).json({
                    error: "please fill all the required fields"
                })
            }
            const postExist = await db.getPostById(PostId as unknown as Types.ObjectId);
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
                Posts: posts,
            });
        } catch (error) {
            next(error);
        }

    }
}

export const deletePost = (db: mongoDb) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {postId} = req.body;
            if (!postId) {
                return res.status(400).json({
                    error: "please fill all the required fields"
                });
            }
            await db.deletePost(postId as Types.ObjectId);
            return res.status(200).json({
                message: "Post successfully deleted"
            })
        } catch (error) {
            next(error);
        }

    }
}

export const editPost = (db: mongoDb) => {
    return async (req: LoggedInUserRequest, res: Response, next: NextFunction) => {
        try {
            const userData = req.loggedInUser?.userData;
            if (!userData) {
                return res.status(401).json({message: "Not authenticated"});
            }
            const userId: Types.ObjectId = userData._id as Types.ObjectId;
            const {postId, title, url, tags}: editPostBody = req.body;
            if (!title && !url && tags.length == 0) {
                return res.status(400).json({error: "please fill at least one field"});
            }
            const newPost: Partial<Post> = {
                title,
                url,
                tags
            }
            await db.editPost(userId, postId as unknown as Types.ObjectId, newPost)
        } catch (error) {
            next(error);
        }
    }
}

export const searchPosts = (db: mongoDb) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {keyword}: searchPostsBody = req.body;
            if (!keyword) {
                return res.status(400).json({error: "please fill all the required fields"});
            }
            const postsFound = await db.searchPosts(keyword);
            return res.status(200).json({
                message: "Post successfully found",
                postsFound: postsFound
            });
        } catch (error) {
            next(error);
        }

    }
}

export const filterByTag = (db: mongoDb) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {tag}: filterByTagBody = req.body;
            const postsFound = await db.filterPostsByTag(tag);
            return res.status(200).json({
                message: "Post successfully found",
                postsFound: postsFound
            })
        } catch (error) {
            next(error);
        }
    }
}