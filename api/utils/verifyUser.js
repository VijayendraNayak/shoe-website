import jwt from "jsonwebtoken"
import { errorhandler } from "./error.js"

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) return next(errorhandler(403, 'unAuthorized'))

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorhandler(403, "Invalid User"))
        req.user = user
        next()
    })
}

