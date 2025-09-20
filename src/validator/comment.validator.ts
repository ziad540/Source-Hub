import * as z from "zod";

export const createCommentValidator = {
    body: z.strictObject({
        title: z.string().nonoptional(),
        postId: z.string().length(24).nonoptional(),
    })
}

export const deleteCommentValidator = {
    body: z.strictObject({
        commentId: z.string().length(24).nonoptional(),
    })
}

export const listCommentsValidator = {
    body: z.strictObject({
        postId: z.string().length(24).nonoptional(),
    })
}