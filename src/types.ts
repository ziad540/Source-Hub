import mongoose, {Document, Types} from 'mongoose';

export interface User {
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
}

export interface Post {
    _id: Types.ObjectId;
    title: string;
    url: string;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    tags: [string];

}

export interface Like {
    userId: Types.ObjectId;
    postId: Types.ObjectId;
}

export interface Comment {
    userId: Types.ObjectId;
    postId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
