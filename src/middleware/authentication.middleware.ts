import jwt from "jsonwebtoken";
import {JwtPayload} from "jsonwebtoken";
import userDb from "../dataStore/mongoDb/collections/userCollection";
import {customError} from "../utlis/customError";
import {NextFunction, Response, Request} from "express";
import blackListTokens from "../dataStore/mongoDb/collections/blackListTokenCollection";
import {LoggedInUserRequest} from "../customTypes/requestTypes";


export const authenticationMiddleware = async (req: LoggedInUserRequest, res: Response, next: NextFunction) => {
    // get token from headers
    const accesstoken = req.headers['accesstoken'] as string | undefined;


    if (!accesstoken) {
        throw new customError('Token Not Found', 404);
    }
    // decode token to get data
    const objUserFromToken = jwt.verify(accesstoken!, process.env.PROFILE_SECRET as string) as JwtPayload & {
        id: string,
        jti: string,
        exp: Date,
    };

    if (!objUserFromToken.jti) {
        throw new customError('Invalid Token', 404);
    }
    //check token in black list or not
    const blackListToken = await blackListTokens.findOne({
        tokenId: objUserFromToken.jti
    });
    if (blackListToken) {
        throw new customError('Token in black list', 401);
    }
    const userId = objUserFromToken.id;
    const userData = await userDb.findById(userId).lean();
    if (!userData) {
        throw new customError('User Not Found', 404);
    }
    //   pipLine obj userData to another stage

    req.loggedInUser = {userData, token: {tokenId: objUserFromToken.jti, expirationDate: objUserFromToken.exp}};
    next();
}