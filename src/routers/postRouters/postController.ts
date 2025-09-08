import {db} from "../../dataStore";
import {mongoDb} from "../../dataStore/mongoDb";
import {Router} from "express";
import {createPostService} from "./postService";

export const postController = (db: mongoDb) => {
    const router = Router();
    router.get('/list_posts', createPostService(db));


    return router
}