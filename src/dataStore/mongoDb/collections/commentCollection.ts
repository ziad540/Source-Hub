import mongoose from 'mongoose'

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


const commentDb = mongoose.model('Comment', commentSchema);
export default commentDb;