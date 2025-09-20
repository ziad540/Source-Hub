import * as z from "zod";
import {
    getUserByEmailValidator,
    signInValidator,
    signUpValidator,
    updateUserValidator
} from "../validator/user.validator";
import {
    createPostValidator,
    editPostValidator, 
    filterPostValidator,
    getPostByIdValidator,
    searchPostValidator
} from "../validator/post.validator";
import {
    createLikeValidator,
    deleteLikeValidator
} from "../validator/like.validator";
import {
    createCommentValidator,
    deleteCommentValidator,
    listCommentsValidator
} from "../validator/comment.validator";

export type signUpBody = z.infer<typeof signUpValidator.body>
export type signInBody = z.infer<typeof signInValidator.body>
export type getUserByEmailBody = z.infer<typeof getUserByEmailValidator.body>
export type updateUserBody = z.infer<typeof updateUserValidator.body>
export type createPostBody = z.infer<typeof createPostValidator.body>
export type getPostByIdBody = z.infer<typeof getPostByIdValidator.body>
export type editPostBody = z.infer<typeof editPostValidator.body>
export type searchPostsBody = z.infer<typeof searchPostValidator.body>
export type filterByTagBody = z.infer<typeof filterPostValidator.body>
export type createLikeBody = z.infer<typeof createLikeValidator.body>
export type deleteLikeBody = z.infer<typeof deleteLikeValidator.body>
export type createCommentBody = z.infer<typeof createCommentValidator.body>
export type deleteCommentBody = z.infer<typeof deleteCommentValidator.body>
export type listCommentsBody = z.infer<typeof listCommentsValidator.body>