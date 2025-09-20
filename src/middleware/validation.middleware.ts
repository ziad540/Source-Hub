import {Request, Response, NextFunction} from "express";
import {ZodType} from "zod";
import {ValidationError} from "../utlis/validationError";

type RequestkeyType = keyof Request;
type schemaType = Partial<Record<RequestkeyType, ZodType>>
type validationErrorType = {
    key: RequestkeyType,
    issues: {
        path: PropertyKey[],
        message: string
    }[]
}

export const validationMiddleware = (schema: schemaType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const reqKeys: RequestkeyType[] = ['body', 'params', 'query', 'headers'];
        const validationErrors: validationErrorType[] = [];
        for (const key of reqKeys) {
            if (schema[key]) {
                const result = schema[key].safeParse(req[key]);
                if (!result?.success) {
                    const issues = result.error?.issues?.map((issue) => ({
                        path: issue.path,
                        message: issue.message,
                    }));
                    validationErrors.push({key, issues});
                }

            }
        }
        if (validationErrors.length) {
            // Convert validation errors to ValidationError format
            const errorDetails = validationErrors.flatMap(error => 
                error.issues.map(issue => ({
                    field: `${String(error.key)}.${issue.path.map(p => String(p)).join('.')}`,
                    message: issue.message,
                    code: 'validation_failed'
                }))
            );
            
            throw ValidationError.forFields(errorDetails);
        }
        next();
    }
}