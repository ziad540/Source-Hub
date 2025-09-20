import {mongoDb} from "../../dataStore/mongoDb";
import {Router} from "express";
import {createPostService, deletePost, editPost, filterByTag, getPostById, listPosts, searchPosts} from "./postService";
import {authenticationMiddleware} from "../../middleware/authentication.middleware";
import {validationMiddleware} from "../../middleware/validation.middleware";
import {
    createPostValidator,
    editPostValidator, filterPostValidator,
    getPostByIdValidator,
    searchPostValidator
} from "../../validator/post.validator";

export const postController = (db: mongoDb) => {
    const router = Router();
    router.post('/create_post', validationMiddleware(createPostValidator), authenticationMiddleware, createPostService(db));
    router.get('/get_post', validationMiddleware(getPostByIdValidator), getPostById(db));
    router.get('/list_posts', authenticationMiddleware, listPosts(db));
    router.delete('/delete_post', authenticationMiddleware, deletePost(db));
    router.put('/edit_post', validationMiddleware(editPostValidator), authenticationMiddleware, editPost(db));
    router.get('/search_posts', validationMiddleware(searchPostValidator), authenticationMiddleware, searchPosts(db));
    router.get('/filter-tag', validationMiddleware(filterPostValidator), authenticationMiddleware, filterByTag(db));
    return router
}