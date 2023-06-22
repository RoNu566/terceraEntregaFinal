import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { options } from "./config/options.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

const validatePassword = (user, loginPasword) => {
    return bcrypt.compareSync(loginPasword, user.password);
}

const emailToken = (email, expireTime) => {
    const token = jwt.sign({ email }, options.server.secretSession, { expiresIn: expireTime });
    return token
}

const verifyToken = (token) => {
    try {
        const info = jwt.verify(token, options.server.secretSession)
        return info.email
    } catch (error) {
        console.log(error.message)
        return null
    }
}

export { __dirname, hashPassword, validatePassword, emailToken, verifyToken };

