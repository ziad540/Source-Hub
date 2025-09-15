import mongoose, {Model} from "mongoose";
import {Like} from "../../../types";

const {Schema} = mongoose;

const likeSchema = new Schema({
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
});
likeSchema.index({userId: 1, postId: 1}, {
    unique: true,
});
const likeDb: Model<Like> = mongoose.model<Like>('Like', likeSchema);
export default likeDb;