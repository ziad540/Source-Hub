import {User, Post, Like, Comment} from "../../types";
import {DataStore} from "../index";
import mongoose from 'mongoose';
import 'dotenv/config'
import {mongoUserDao} from "./ MongoDao/ MongoUserDao";


export class mongoDb implements DataStore {
    private userDbDao: mongoUserDao

    constructor() {
        this.userDbDao = new mongoUserDao()
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

    updateUser(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }

    createPost(post: Post): Promise<void> {
        throw new Error("Method not implemented.");
    }

    listPosts(): Promise<Post[]> {
        throw new Error("Method not implemented.");
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