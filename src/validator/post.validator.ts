import * as z from "zod";

export const createPostValidator = {
    body: z.strictObject({
        title: z.string().nonoptional(),
        url: z.url().nonoptional(),
    })
}
export const getPostByIdValidator = {
    body: z.strictObject({
        PostId: z.string().length(24).nonoptional(),
    })
}
export const editPostValidator = {
    body: z.strictObject({
        postId: z.string().length(24).nonoptional(),
        title: z.string(),
        url: z.url(),
        tags: z.array(z.string()),
    })
}
export const searchPostValidator = {
    body: z.strictObject({
        keyword: z.string().nonoptional(),
    })
}

export const filterPostValidator = {
    body: z.strictObject({
        tag: z.string().nonoptional(),
    })
}