import {User} from "../../types";

export interface UserDao {
    createUser(user: User): Promise<void>,

    getUserByEmail(userEmail: string): Promise<User | undefined>

    updateUser(user: User): Promise<void>,
}