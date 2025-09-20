import {Post} from "../../../types";
import postDb from "../collections/postCollection";
import mongoose, {Types} from "mongoose";
import {customError} from "../../../utlis/customError";
import commentDb from "../collections/commentCollection";
import likeDb from "../collections/likeCollection";


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
        console.log("id", id)
        const post = await postDb.findOne({
            _id: id,
        })
        if (!post) {
            throw new customError("Post not found", 400)
        }
        return post;
    }

    async deletePost(id: Types.ObjectId): Promise<void> {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {

            const postExist = await postDb.findByIdAndDelete(id, {session});
            if (!postExist) {
                new customError("post not found", 400);
            }
            await commentDb.deleteMany({
                postId: id,
            }, {
                session
            });
            await likeDb.deleteMany({
                postId: id,
            }, {
                session
            })
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            throw new customError("Transaction aborted ❌", 500);
        } finally {
            await session.endSession();
        }

    }

    async editPost(userId: Types.ObjectId, id: Types.ObjectId, newPost: Partial<Post>): Promise<void> {
        const postObj = await postDb.findById(id);
        if (!postObj) {
            throw new customError("Id not correct", 400)
        }
        if (!postObj.userId.equals(userId)) {
            throw new customError("user not authorized", 403);
        }
        const allowedFields: Array<keyof Post> = ["title", "url"];
        const updateData: any = {};
        for (const field of allowedFields) {
            if (newPost[field] !== undefined) {
                if (!updateData.$set) updateData.$set = {};
                updateData.$set[field] = newPost[field];
            }
        }
        if (newPost.tags && newPost.tags.length > 0) {
            updateData.$addToSet = {tags: {$each: newPost.tags}};
        }

        const postUpdated = await postDb.findByIdAndUpdate(id, updateData, {
            new: true
        });

        if (!postUpdated) {
            throw new customError("post not found", 400);
        }
    }

    async searchPosts(keyword: string): Promise<Post[]> {
        const posts = await postDb.find(
            {$text: {$search: keyword}},
            {score: {$meta: "textScore"}}
        ).sort({score: {$meta: "textScore"}}).select("title url");
        if (posts.length <= 0) {
            throw new customError("No posts found", 403);
        }
        return posts;
    }

    async filterByTag(tag: string): Promise<Post[]> {
        const postsFound = await postDb.find({
            tags: tag
        }).select("title url");
        if (postsFound.length <= 0) {
            throw new customError("No posts found", 403);
        }
        return postsFound;
    }

}