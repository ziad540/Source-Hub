export interface User {
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
}

export interface Post {
    title: string;
    url: string;
    userId: string;
    postedAt: number;
}

export interface Like {
    userId: string;
    postId: string;
}

export interface Comment {
    userId: string;
    postId: string;
    postedAt: number;
}
