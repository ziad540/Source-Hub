import {mongoDb} from "../../dataStore/mongoDb";
import {Router} from "express";
import {createPostService, deletePost, editPost, filterByTag, getPostById, listPosts, searchPosts} from "./postService";
import {authenticationMiddleware} from "../../middleware/authentication.middleware";

export const postController = (db: mongoDb) => {
    const router = Router();
    router.post('/create_post', authenticationMiddleware, createPostService(db));
    router.get('/get_post', getPostById(db));
    router.get('/list_posts', authenticationMiddleware, listPosts(db));
    router.delete('/delete_post', authenticationMiddleware, deletePost(db));
    router.put('/edit_post', authenticationMiddleware, editPost(db));
    router.get('/search_posts', authenticationMiddleware, searchPosts(db));
    router.get('/filter-tag', authenticationMiddleware, filterByTag(db));
    return router
}