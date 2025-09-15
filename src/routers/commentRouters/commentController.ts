import {Router} from "express";
import {authenticationMiddleware} from "../../middleware/authentication.middleware";
import {createCommentService, deleteCommentService} from "./commentService";
import {mongoDb} from "../../dataStore/mongoDb";

export const commentController = (db: mongoDb) => {
    const router = Router();
    router.post('/create_comment', authenticationMiddleware, createCommentService(db));
    router.delete('/delete_comment/:commentId', authenticationMiddleware, deleteCommentService(db));
    return router;
}