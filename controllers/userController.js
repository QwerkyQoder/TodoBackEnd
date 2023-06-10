const User = require('../model/User')
const asyncHandler = require("../middleware/asyncHandler")
const CustomError = require("../utils/CustomError")
const tokenList = []

const cookieOptions = {
    // expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    //could be in a separate file in utils
}

exports.home = (req, res) => {
    res.send(" Welcome to TODO server")
}

exports.register =(req, res) => {
    console.log("Register reached")
    res.send(" Registration in progress")
}

exports.register = asyncHandler(async (req, res) => {
    const {username, email, password } = req.body

    console.log("REGISTER", req.body)

    if (!username || !email || !password) {
        throw new CustomError('Please fill all fields', 400)
    }
    //check if user exists
    const existingUser = await User.findOne({email})

    if (existingUser) {
        throw new CustomError('User already exists', 400)  
    }

    const user = await User.create({
        username,
        email,
        password
    });

    console.log( "user", user);
    const token = user.getJwtToken()
    console.log("token", token)
    user.password = undefined

    tokenList.push(token)
    console.log("tokenList", tokenList)

    res.cookie("token", token, cookieOptions)

    res.status(200).json({
        success: true,
        token,
        user
    })

})