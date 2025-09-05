import mongoose from "mongoose";

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


const likeDb = mongoose.model('Like', likeSchema);