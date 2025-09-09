import {User} from "../types";
import {Document} from "mongoose";


export interface UserDoc extends User, Document {
}