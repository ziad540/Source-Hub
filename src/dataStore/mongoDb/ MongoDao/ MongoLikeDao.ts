import {Like} from "../../../types";
import likeDb from "../collections/likeCollection";
import mongoose from "mongoose";
import postDb from "../collections/postCollection";
import {customError} from "../../../utlis/customError";


export class mongoLikeDao {

    async createLike(like: Like): Promise<void> {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            await likeDb.create([{
                userId: like.userId,
                postId: like.postId,
            }], {session});
            await postDb.updateOne({_id: like.postId}, {$inc: {likesNumber: 1}}, {session})
            await session.commitTransaction();
        } catch (err: any) {
            await session.abortTransaction();
                if (err.code === 11000) {
                    throw new customError("Already liked", 400)
                }
            throw new customError("Server Error", 500)
        } finally {
            await session.endSession();
        }
    }

    async deleteLike(like: Like): Promise<void> {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const deletedLike = await likeDb.findOneAndDelete({
                userId: like.userId,
                postId: like.postId,
            }, {session});
            
            if (!deletedLike) {
                throw new customError("Like not found", 404);
            }
            
            await postDb.updateOne({_id: like.postId}, {$inc: {likesNumber: -1}}, {session});
            await session.commitTransaction();
        } catch (err: any) {
            await session.abortTransaction();
            if (err instanceof customError) {
                throw err;
            }
            throw new customError("Server Error", 500);
        } finally {
            await session.endSession();
        }
    }
}