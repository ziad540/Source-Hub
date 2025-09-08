import mongoose, { Schema, Document } from 'mongoose';

export interface User {
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
}

export interface Post extends Document {
    title: string;
    url: string;
    userId: mongoose.Types.ObjectId;
}

export interface Like extends Document {
    userId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
}

export interface Comment extends Document {
    userId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    postedAt: number;
}
