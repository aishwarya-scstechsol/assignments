import * as bcrypt from "bcrypt"
export class PasswordHasher {
    hashPassword=async(password)=> {
        let salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password , salt)
        return hash

    }
}