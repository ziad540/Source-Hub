import {UserDoc} from "./mongooseObj";

declare global {
    namespace Express {
        interface Request {
            loggedInUser?: {
                userData: UserDoc;
                token: {
                    tokenId: string;
                    expirationDate: number;
                };
            };
        }
    }
}

export {};