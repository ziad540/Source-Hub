import mongoose, {Model} from "mongoose";
import {User} from "../../../types";

const {Schema} = mongoose;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    }

});

interface UserDoc extends User, Document {
}

const userDb: Model<UserDoc> = mongoose.model<UserDoc>("User", userSchema);
export default userDb;