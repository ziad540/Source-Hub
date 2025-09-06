import mongoose from "mongoose";


const {Schema} = mongoose;
const blackListTokenSchema = new Schema({
    tokenId:{
        type: String,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true
    }
})
blackListTokenSchema.index({tokenId: 1},{
    name:'TokenId_idx'
})

const blackListTokens = mongoose.model("BlackListTokens", blackListTokenSchema);
export default blackListTokens;