import { Comment } from "../../../types";
import { CommentDao } from "../../DAO/commentDao";
import commentDb from "../collections/commentCollection";
import mongoose, { Types } from "mongoose";
import { customError } from "../../../utlis/customError";
import postDb from "../collections/postCollection";

export class MongoCommentDao implements CommentDao {

    async createComment(comment: Comment): Promise<void> {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            await commentDb.create([comment], { session });
            await postDb.updateOne({ _id: comment.postId }, { $inc: { commentsNumber: 1 } }, { session })
            await session.commitTransaction();
        } catch (error: any) {
            await session.abortTransaction();
            if (error.code === 11000) {
                throw new customError("Already commented", 400)
            }
            throw new customError("Failed to create comment", 500);
        } finally {
            await session.endSession();
        }
    }

    async deleteComment(id: string): Promise<void> {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const commentId = new Types.ObjectId(id);
            const deletedComment = await commentDb.findByIdAndDelete(commentId, { session });

            if (!deletedComment) {
                throw new customError("Comment not found", 404);
            }
            await postDb.updateOne({ _id: deletedComment.postId }, { $inc: { commentsNumber: -1 } }, { session })
            await session.commitTransaction();
        } catch (error: any) {
            await session.abortTransaction();
            throw new customError("Failed to delete comment", 500);
        } finally {
            await session.endSession();
        }
    }

    async listComments(postId: string): Promise<Comment[]> {
        const postObjectId = new Types.ObjectId(postId);
        const comments = await commentDb.find({
            postId: postObjectId
        }).sort({ createdAt: -1 });

        return comments;
    }
}