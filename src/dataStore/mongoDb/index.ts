import {User, Post, Like, Comment} from "../../types";
import {DataStore} from "../index";
import mongoose, {Error, Promise, Types} from 'mongoose';
import 'dotenv/config'
import {mongoUserDao} from "./ MongoDao/ MongoUserDao";
import {UserDoc} from "../../customTypes/mongooseObj";
import {mongoPostDao} from "./ MongoDao/ MongoPostDao";
import {mongoLikeDao} from "./ MongoDao/ MongoLikeDao";


export class mongoDb implements DataStore {
    private userDbDao: mongoUserDao
    private postDbDao: mongoPostDao
    private likeDbDao: mongoLikeDao

    constructor() {
        this.userDbDao = new mongoUserDao()
        this.postDbDao = new mongoPostDao()
        this.likeDbDao = new mongoLikeDao()
    }


    //create database
    public async createDataBase() {
        if (!process.env.MONGODB_URI) {
            throw new Error('MongoDB URI is required');
        }
        await mongoose.connect(process.env.MONGODB_URI);
        return this;
    }

    createUser(user: User): Promise<void> {
        return this.userDbDao.createUser(user)
    }

    getUserByEmail(userEmail: string): Promise<User | undefined> {
        return this.userDbDao.getUserByEmail(userEmail)
    }

    updateUser(user: UserDoc, newUserName: string, newEmail: string): Promise<UserDoc> {
        return this.userDbDao.updateUser(user, newUserName, newEmail)

    }

    signInUser(userEmail: string, password: string): Promise<UserDoc> {
        return this.userDbDao.signInUser(userEmail, password)
    }

    createPost(post: Post): Promise<void> {
        return this.postDbDao.createPost(post)
    }

    listPosts(userId: Types.ObjectId): Promise<Post[]> {
        return this.postDbDao.listPosts(userId)
    }

    getPostById(id: Types.ObjectId): Promise<Post | undefined> {
        return this.postDbDao.getPostById(id);
    }

    deletePost(id: Types.ObjectId): Promise<void> {
        return this.postDbDao.deletePost(id);
    }

    editPost(userId: Types.ObjectId, id: Types.ObjectId, newPost: Partial<Post>): Promise<void> {
        return this.postDbDao.editPost(userId, id, newPost)
    }

    searchPosts(keyword: string): Promise<Post[]> {
        return this.postDbDao.searchPosts(keyword)
    }

    filterPostsByTag(tag: string): Promise<Post[]> {
        return this.postDbDao.filterByTag(tag)
    }

    createLike(like: Like): Promise<void> {
        return this.likeDbDao.createLike(like)
    }

    deleteLike(like: Like): Promise<void> {
        return this.likeDbDao.deleteLike(like)
    }

    createComment(comment: Comment): Promise<void> {
        throw new Error("Method not implemented.");
    }

    deleteComment(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    listComments(postId: string): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }


}