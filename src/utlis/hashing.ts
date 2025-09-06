import bcrypt from "bcrypt";

export const hashingValue = (value: string) => bcrypt.hash(value, Number(process.env.SALT));

export const comparePassword = function (password: string, hashingValue: string): boolean {
    // @ts-ignore
    return bcrypt.compare(password, hashingValue);
}