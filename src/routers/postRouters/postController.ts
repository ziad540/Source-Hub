import {mongoDb} from "../../dataStore/mongoDb";
import {Router} from "express";
import {createPostService, getPostById, listPosts} from "./postService";
import {authenticationMiddleware} from "../../middleware/authentication.middleware";

export const postController = (db: mongoDb) => {
    const router = Router();
    router.post('/create_post', authenticationMiddleware, createPostService(db));
    router.get('/get_post', getPostById(db));
    router.get('/list_posts', authenticationMiddleware, listPosts(db));
    return router
}