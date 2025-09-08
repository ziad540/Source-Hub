import {Post} from "../../../types";
import {UserDoc} from "../../../customTypes/mongooseObj";
import postDb from "../collections/postCollection";

export class mongoPostDao {

    async createPost(post: Post): Promise<void> {
        const postExist = await postDb.findOne({
            title: post.title,
        });
        if (postExist) {
            throw new Error('This is source is already exist')
        }
        await postDb.create(post);
    }

    async listPosts(user: UserDoc): Promise<Post[]> {
        const posts = await postDb.find({
            userId: user._id,
        });
        return posts;
    }
}