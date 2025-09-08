import {User, Post, Like, Comment} from "../../types";
import {DataStore} from "../index";
import mongoose from 'mongoose';
import 'dotenv/config'
import {mongoUserDao} from "./ MongoDao/ MongoUserDao";
import {UserDoc} from "../../customTypes/mongooseObj";
import {mongoPostDao} from "./ MongoDao/ MongoPostDao";


export class mongoDb implements DataStore {
    private userDbDao: mongoUserDao
    private postDbDao: mongoPostDao

    constructor() {
        this.userDbDao = new mongoUserDao()
        this.postDbDao = new mongoPostDao()
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

    listPosts(user: UserDoc): Promise<Post[]> {
        return this.postDbDao.listPosts(user)
    }

    getPostById(id: string): Promise<Post | undefined> {
        throw new Error("Method not implemented.");
    }

    deletePost(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    createLike(like: Like): Promise<void> {
        throw new Error("Method not implemented.");
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