import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import config from './../../config/config.js';

const signin = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ error: "User not found" });
        
        if (!user.authenticate(req.body.password)) {
            return res.status(401).json({ error: "Email and password don't match." });
        }

        const token = jwt.sign({ _id: user._id }, config.jwtSecret);
        res.cookie('t', token, { expires: new Date(Date.now() + 86400000) }); // Token expires in 1 day
        
        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(401).json({ error: "Could not sign in" });
    }
}

const signout = (req, res) => {
    res.clearCookie("t");
    return res.status(200).json({
        message: "Signed out"
    });
}

const requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
    userProperty: 'auth'
});

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && String(req.profile._id) === String(req.auth._id);
    if (!authorized) {
        return res.status(403).json({
            error: "User is not authorized"
        });
    }
    next();
}

export default { signin, signout, requireSignin, hasAuthorization };