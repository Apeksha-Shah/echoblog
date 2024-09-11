import jwt from 'jsonwebtoken';
import secretKey from '../config/jwtConfig.js';
const generateToken = (User) => {
    const userobj = {
        id:User.id,
        username:User.username,
        email:User.email,
        password:User.password,
        role_id:User.role_id
    }
    return jwt.sign(userobj,secretKey,{ expiresIn: "1h" })
}

const generateRefreshToken = (User) => {
    const userobj = {
        id:User.id,
        username:User.username,
        email:User.email,
        password:User.password,
        role_id:User.role_id
    }
    return jwt.sign(userobj,secretKey,{ expiresIn: "6h" })
}

const verifyToken = (token) => {
    return jwt.verify(token,secretKey)
}

export default {generateToken,generateRefreshToken,verifyToken};
