import userDb from "../collections/userCollection";
import {User} from "../../../types.js";
import {customError} from "../../../utlis/customError";
import {hashingValue} from "../../../utlis/hashing";

export class mongoUserDao {
    async createUser(user: User): Promise<void> {

        const userExist = await userDb.findOne({
            email: user.email,
        });
        if (userExist) {
            console.log(userExist._id);
            throw new customError("Email already exists", 400);
        }
        const userNameExist = await userDb.findOne({
            username: user.username,
        })
        if (userNameExist) {
            throw new customError("Username already exists", 400);
        }
        const passwordHashed = await hashingValue(user.password)
        const newUser = new userDb({
            email: user.email,
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            password: passwordHashed,
        })
        await newUser.save();

    }

    async getUserByEmail(userEmail: string): Promise<User | undefined> {
        const userExist = await userDb.findOne({
            email: userEmail,
        });
        if (!userExist) {
            throw new customError("User not found", 400);
        }
        return userExist;
    }
    async updateUser(user: User): Promise<void> {
        
    }

}