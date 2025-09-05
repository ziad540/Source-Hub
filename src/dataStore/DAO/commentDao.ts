import {Comment} from "../../types";

export interface CommentDao {
    createComment(comment: Comment): Promise<void>

    deleteComment(id: string): Promise<void>

    listComments(postId: string): Promise<Comment[]>
}