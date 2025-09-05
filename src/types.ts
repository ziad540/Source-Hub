export interface User {
    username: string;
    password: string;
    id: string;
    email: string;
    firstname: string;
    lastname: string;
}

export interface Post {
    id: number;
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
    id: string
    userId: string;
    postId: string;
    postedAt: number;
}
