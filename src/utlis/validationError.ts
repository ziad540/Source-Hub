import { ZodError, ZodIssue } from "zod";

export interface ValidationErrorDetail {
    field: string;
    message: string;
    code: string;
    received?: any;
}

export class ValidationError extends Error {
    private statuscode: number;
    private errors: ValidationErrorDetail[];
    private type: string;

    constructor(message: string, errors: ValidationErrorDetail[] = [], statuscode: number = 400) {
        super(message);
        this.statuscode = statuscode;
        this.errors = errors;
        this.type = 'ValidationError';
        Object.setPrototypeOf(this, ValidationError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }

    // Static method to create ValidationError for multiple fields
    static forFields(fieldErrors: { field: string; message: string; code?: string; received?: any }[]): ValidationError {
        const errors: ValidationErrorDetail[] = fieldErrors.map(error => ({
            field: error.field,
            message: error.message,
            code: error.code || 'custom',
            received: error.received
        }));

        const message = `Validation failed: ${errors.map(e => `${e.field} - ${e.message}`).join(', ')}`;
        
        return new ValidationError(message, errors, 400);
    }

    public toJSON() {
        return {
            success: false,
            type: this.type,
            message: this.message,
            statusCode: this.statuscode,
            errors: this.errors,
            timestamp: new Date().toISOString()
        };
    }
}