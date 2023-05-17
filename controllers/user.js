import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { setCookies } from "../utils/setcookies.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });

        if (user)
            res.status(400).json({ success: false, message: "previously register" });
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await User.create({ name, email, password: hashedPassword });

            setCookies(res, user.id, "register successfully", 201, 1000 * 60 * 60);
        }
    } 
    catch (error) {
        res.status(400).json({ error: error.message,success: false });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // here due to select keyword in password we have to manually extract the password using +password and by default it will be not be there.
        let user = await User.findOne({ email }).select("+password");

        if (user) {
            const matched = await bcrypt.compare(password, user.password);
            if (matched) {
                setCookies(
                res,
                user.id,
                `Welcom back ${user.name}`,
                202,
                1000 * 60 * 60
                );
            }
            else {
                res.json({ success: false, message: "wrong password" });
            }
        } 
        else {
            res.status(404).json({ success: false, message: "user not found" });
        }
    } 
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const logout = (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        res.status(400).json({ success: false, message: "already logged out" });
    } 
    else setCookies(res, "", "logout successfully", 200, 0);
};

export const getMyProfile = (req, res) => {
    res.status(200).json({ success: true, user: req.user });
};
