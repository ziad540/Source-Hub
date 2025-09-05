import mongoose from "mongoose";

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
}, {
    timestamps: true
});

const postDb = mongoose.model("Post", postSchema);
export default postDb;