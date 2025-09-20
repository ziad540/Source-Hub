import * as z from "zod";

export const signUpValidator = {
    body: z.strictObject({
        email: z.email(),
        username: z.string().nonoptional(),
        password: z.string().regex(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/).nonoptional(),
        firstname: z.string().min(2, "To short!").nonoptional(),
        lastname: z.string().min(2, "To short!").nonoptional(),
    })
}


export const signInValidator = {
    body: z.strictObject({
        email: z.email().nonoptional(),
        password: z.string().nonoptional(),
    }),
}

export const getUserByEmailValidator = {
    body: z.strictObject({
        email: z.email().nonoptional(),
    })
}

export const updateUserValidator = {
    body: z.strictObject({
        newUserName: z.string().optional(),
        newEmail: z.email().optional()
    })
}