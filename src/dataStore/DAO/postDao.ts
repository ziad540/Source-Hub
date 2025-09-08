import {Post} from "../../types";
import {UserDoc} from "../../customTypes/mongooseObj";

export interface PostDao {
    createPost(post: Post): Promise<void>,

    listPosts(user:UserDoc): Promise<Post[]>,

    getPostById(id: string): Promise<Post | undefined>

    deletePost(id: string): Promise<void>
}