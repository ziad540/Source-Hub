export class customError extends Error {
    public statuscode: number;

    constructor(message: string, statuscode: number) {
        super(message);
        this.statuscode = statuscode;
        Object.setPrototypeOf(this, customError.prototype);
        Error.captureStackTrace(this, this.constructor);

    }
}