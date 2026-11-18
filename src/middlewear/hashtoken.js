import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import sessionSchema from "../model/sessionSchema.js";

export const hashToken = async (req, res, next) => {
    try {
       const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(400).json({
                success: false,
                message: "invalid headers!!"
            })
        }
        const token = authHeader.split(" ")[1];
        console.log(token);
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "invalid token"
            })
        };

        let decode;

        try {
            decode = jwt.verify(token, process.env.secretKey, { ignoreExpiration: true });
            console.log(decode);
        } catch (error) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ success: false, message: "Token expired!" });
            }
            return res.status(401).json({ success: false, message: "Token invalid!!" });
        };

        const session = await sessionSchema.findById(decode.id);
        if (!session) {
            return res.status(404).json({
                success: false,
                message: "no active session is alive please login first"
            })
        };
        req.userId = session.userId;
        req.sessionId = session._id;
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "invalid token "
        })
    }
};