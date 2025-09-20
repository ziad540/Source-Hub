import * as z from "zod";

export const createLikeValidator = {
    body: z.strictObject({
        postId: z.string().length(24).nonoptional(),
    })
}

export const deleteLikeValidator = {
    body: z.strictObject({
        postId: z.string().length(24).nonoptional(),
    })
}