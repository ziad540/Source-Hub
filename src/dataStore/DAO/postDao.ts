import {Post} from "../../types";
import {PostDoc, UserDoc} from "../../customTypes/mongooseObj";
import {Types} from "mongoose";

export interface PostDao {
    createPost(post: Post): Promise<void>,

    listPosts(userId: Types.ObjectId): Promise<Post[]>,

    getPostById(id: Types.ObjectId): Promise<Post | undefined>

    deletePost(id: string): Promise<void>
}