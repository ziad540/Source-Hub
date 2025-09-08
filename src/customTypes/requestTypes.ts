import {UserDoc} from "./mongooseObj";
import { Request } from "express";

export interface LoggedInUserRequest extends Request {
    loggedInUser?: {
        userData: UserDoc;
        token: {
            tokenId: string;
            expirationDate: number;
        };
    };
}
