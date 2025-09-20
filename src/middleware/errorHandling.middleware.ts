import {Response, Request, NextFunction,} from "express";
import {customError} from "../utlis/customError";
import {ValidationError} from "../utlis/validationError";

export const errorHandlingMiddleware = (err: Error | customError | ValidationError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    
    // Handle ValidationError with detailed error information
    if (err instanceof ValidationError) {
        return res.status(err.statuscode).json(err.toJSON());
    }
    
    // Handle customError
    if (err instanceof customError) {
        return res.status(err.statuscode).json({
            success: false,
            error: err.message
        });
    }
    
    // Handle generic errors
    return res.status(500).json({
        success: false,
        error: err.message || "Internal Server Error"
    });
}