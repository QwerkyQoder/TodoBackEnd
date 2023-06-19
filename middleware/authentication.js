User = require('../model/User')
const BlockList = require("../model/Logout")
JWT = require('jsonwebtoken')
asyncHandler = require('../middleware/asyncHandler')
CustomError = require('../utils/CustomError')

exports.isLoggedIn = asyncHandler(async(req, res, next) => {
    let token;

    console.log("ISLOGGEDIN?")

    if((req.headers.authorization && req.headers.authorization.startsWith("Bearer")))
    {
            token = req.headers.authorization.split(" ")[1] // [0] has "Bearer"
    }
    
    console.log("token", token)

    if(!token) {
        console.log("No token")
        throw new CustomError("Not authorized to access", 401)
    }

    const checkIfBlacklisted = await BlockList.findOne({ token: token }); // Check if that token is blacklisted
    // if true, send a no content response.
    if (checkIfBlacklisted) return res.sendStatus(401);

    try {
        const decJWTpayload = JWT.verify(token, process.env.JWT_SECRET);
        console.log(decJWTpayload)
        // _id, find user with id, set this in user
        req.user = await User.findById(decJWTpayload._id, "email")
        req.token = token
        next()
    } catch (error) {
        throw new CustomError("Not authorized to access this route", 401)
    }
})