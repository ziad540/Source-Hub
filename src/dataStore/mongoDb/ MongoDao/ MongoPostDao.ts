import {Post} from "../../../types";
import {UserDoc} from "../../../customTypes/mongooseObj";
import postDb from "../collections/postCollection";
import {Types} from "mongoose";
import {customError} from "../../../utlis/customError";

export class mongoPostDao {

    async createPost(post: Post): Promise<void> {
        const postExist = await postDb.findOne({
            url: post.url,
        });
        if (postExist) {
            throw new Error('This is source is already exist')
        }
        await postDb.create(post);
    }

    async listPosts(id: Types.ObjectId): Promise<Post[]> {
        console.log("id", id)
        const posts = await postDb.find({
            userId: id,
        });
        if (!posts) {
            throw new customError("No post found", 400)
        }
        console.log(posts.map(p => p.toObject()));
        return posts;
    }

    async getPostById(id: Types.ObjectId): Promise<Post | undefined> {
        const post = await postDb.findOne({
            _id: id,
        })
        if (!post) {
            throw new customError("Id not correct", 400)
        }
        return post;
    }
}