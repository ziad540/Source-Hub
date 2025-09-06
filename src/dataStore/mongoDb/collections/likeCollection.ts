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

interface LikeDoc extends Like, Document {
}

const likeDb: Model<LikeDoc> = mongoose.model<LikeDoc>('Like', likeSchema);
export default likeDb;