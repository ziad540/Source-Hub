import {Types} from "mongoose";
import jwt from "jsonwebtoken";
import uniqid from 'uniqid';

export const generateAccessToken = (userEmail: string, id: Types.ObjectId): string => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign({
        email: userEmail,
        id: id,
    }, jwtSecret, {
        expiresIn: "10m",
        jwtid: uniqid()
    });
}

export const generateRefreshToken = (userEmail: string, id: Types.ObjectId): string => {
    const jwtSecret = process.env.JWT_SECRET_REFRESH_TOKEN;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined");
    }
    return  jwt.sign({
        email: userEmail,
        id: id,
    }, jwtSecret, {
        expiresIn: "30d",
        jwtid: uniqid()
    })
}