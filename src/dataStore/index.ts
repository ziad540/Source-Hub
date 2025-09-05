import {UserDao} from "./DAO/userDao";
import {PostDao} from "./DAO/postDao";
import {LikeDao} from "./DAO/likeDao";
import {CommentDao} from "./DAO/commentDao";


export interface DataStore extends UserDao, PostDao, LikeDao, CommentDao {
}

export let db: DataStore;
export async function initDb(){
    
}