import mongoose, {Model} from "mongoose";
import {Post, User} from "../../../types";

const {Schema} = mongoose;
const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: [String],
        required: true,
    }
}, {
    timestamps: true
});

interface PostDoc extends Post, Document {
}

const postDb: Model<Post> = mongoose.model<Post>("Post", postSchema);
export default postDb;