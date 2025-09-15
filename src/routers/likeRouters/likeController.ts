import {mongoDb} from "../../dataStore/mongoDb";
import {Router} from "express";
import {authenticationMiddleware} from "../../middleware/authentication.middleware";
import {createLike} from "./likeService";

export const likeController = (db: mongoDb) => {
    const router = Router();
    router.post('/create_like', authenticationMiddleware, createLike(db));
    return router;
}