import {Response, Request, NextFunction,} from "express";
import {customError} from "../utlis/customError";

export const errorHandlingMiddleware = (err: Error | customError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    const status = (err instanceof customError) ? err.statuscode : 500;
    const message = err.message || "Internal Server Error";
    return res.status(status).json({
        success: false,
        error: message
    });
}