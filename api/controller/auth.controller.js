import User from "../models/User.modles.js";
import bcryptjs from "bcryptjs";
import { errorhandler } from "../utils/error.js"
import jwt  from "jsonwebtoken";
// import { errorhandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedpassword = bcryptjs.hashSync(password, 10)
    const newuser = new User({ username, email, password: hashedpassword })
    try {
        await newuser.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        next(error);
        // next(errorhandler(550,"message"))
    }
}
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorhandler(404, "User not found error"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorhandler(404, "Wrong credentials"));
        const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET);
        const {password:pass,...rest}=validUser._doc
        res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);

    } catch (error) {
        next(error);
    }

}