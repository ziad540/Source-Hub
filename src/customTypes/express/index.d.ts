import {UserDoc} from "../mongooseObj";


declare module "express-serve-static-core" {
    interface Request {
        loggedInUser?: {
            userData: UserDoc;
            token: { tokenId: string; expirationDate: number };
        };
    }
}