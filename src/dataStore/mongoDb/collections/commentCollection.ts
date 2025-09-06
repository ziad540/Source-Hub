import mongoose, {Model} from 'mongoose'
import {Comment} from "../../../types";

const {Schema} = mongoose
const commentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
}, {
    timestamps: true
});

interface CommentDoc extends Comment, Document {
}

const commentDb: Model<CommentDoc> = mongoose.model<CommentDoc>("Comment", commentSchema);

export default commentDb;