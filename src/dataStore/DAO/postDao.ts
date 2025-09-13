import {Post} from "../../types";

import {Types} from "mongoose";

export interface PostDao {
    createPost(post: Post): Promise<void>,

    listPosts(userId: Types.ObjectId): Promise<Post[]>,

    getPostById(id: Types.ObjectId): Promise<Post | undefined>

    deletePost(id: Types.ObjectId): Promise<void>

    editPost(userId: Types.ObjectId, id: Types.ObjectId, newPost: Partial<Post>): Promise<void>
}