import {mongoDb} from "../../dataStore/mongoDb";
import {Router} from "express";
import {authenticationMiddleware} from "../../middleware/authentication.middleware";
import {createLike, deleteLike} from "./likeService";

export const likeController = (db: mongoDb) => {
    const router = Router();
    router.post('/create_like', authenticationMiddleware, createLike(db));
    router.delete('/delete_like', authenticationMiddleware, deleteLike(db));
    return router;
}