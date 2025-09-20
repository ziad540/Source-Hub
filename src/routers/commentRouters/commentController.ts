import {Router} from "express";
import {authenticationMiddleware} from "../../middleware/authentication.middleware";
import {validationMiddleware} from "../../middleware/validation.middleware";
import {createCommentService, deleteCommentService, listCommentsService} from "./commentService";
import {mongoDb} from "../../dataStore/mongoDb";
import {createCommentValidator, deleteCommentValidator, listCommentsValidator} from "../../validator/comment.validator";

export const commentController = (db: mongoDb) => {
    const router = Router();
    router.post('/create_comment', validationMiddleware(createCommentValidator), authenticationMiddleware, createCommentService(db));
    router.delete('/delete_comment', validationMiddleware(deleteCommentValidator), authenticationMiddleware, deleteCommentService(db));
    router.post('/list_comments', validationMiddleware(listCommentsValidator), authenticationMiddleware, listCommentsService(db));
    return router;
}