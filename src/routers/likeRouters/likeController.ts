import {mongoDb} from "../../dataStore/mongoDb";
import {Router} from "express";
import {authenticationMiddleware} from "../../middleware/authentication.middleware";
import {validationMiddleware} from "../../middleware/validation.middleware";
import {createLike, deleteLike} from "./likeService";
import {createLikeValidator, deleteLikeValidator} from "../../validator/like.validator";

export const likeController = (db: mongoDb) => {
    const router = Router();
    router.post('/create_like', validationMiddleware(createLikeValidator), authenticationMiddleware, createLike(db));
    router.delete('/delete_like', validationMiddleware(deleteLikeValidator), authenticationMiddleware, deleteLike(db));
    return router;
}