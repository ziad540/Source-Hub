import {User} from "../../types";
import {UserDoc} from "../../customTypes/mongooseObj";

export interface UserDao {
    createUser(user: User): Promise<void>,

    getUserByEmail(userEmail: string): Promise<User | undefined>

    updateUser(user: UserDoc, newUserName: string, newEmail: string): Promise<UserDoc>,
}