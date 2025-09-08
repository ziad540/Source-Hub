import userDb from "../collections/userCollection";
import {User} from "../../../types.js";
import {customError} from "../../../utlis/customError";
import {comparePassword, hashingValue} from "../../../utlis/hashing";
import {UserDoc} from "../../../customTypes/mongooseObj";

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

    async updateUser(user: UserDoc, newUserName: string, newEmail: string): Promise<UserDoc> {
        if (newEmail) {
            const userExist = await userDb.findOne({email: newEmail});
            if (userExist && (userExist._id as any).toString() !== (user._id as any).toString()) {
                throw new customError("Email already exists", 400);
            }
        }
        if (newUserName) {
            const userNameExist = await userDb.findOne({username: newUserName});
            if (userNameExist && (userNameExist._id as any).toString() !== (user._id as any).toString()) {
                throw new customError("Username already exists", 400);
            }
        }

        const updateData: Partial<UserDoc> = {};
        if (newUserName) updateData.username = newUserName;
        if (newEmail) updateData.email = newEmail;


        const userUpdated = await userDb.findOneAndUpdate(
            {_id: user._id},
            updateData,
            {new: true}
        );

        if (!userUpdated) {
            throw new customError("User not found", 404);
        }

        return userUpdated;

    }

    async signInUser(userEmail: string, password: string): Promise<UserDoc> {
        const userExist = await userDb.findOne({
            email: userEmail,
        });
        if (!userExist) {
            throw new customError('Email or Password not correct', 400);
        }
        const passwordMatched = await comparePassword(password, userExist.password);
        if (!passwordMatched) {
            throw new customError("Email or Password do not match", 400);
        }
        return userExist;
    }

}