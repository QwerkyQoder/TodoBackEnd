const User = require('../model/User')
const BlockList = require("../model/Logout")
const asyncHandler = require("../middleware/asyncHandler")
const CustomError = require("../utils/CustomError")

const cookieOptions = {
    // expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
}

const tokenBlackList = [];

exports.home = (req, res) => {
    res.send(" Welcome to TODO server")
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

    res.cookie("token", token, cookieOptions)

    res.status(200).json({
        success: true,
        token,
        user
    })

})


exports.login = asyncHandler (async(req, res, next) => {
    const {email, password} = req.body

    console.log("LOGIN")

    if(!email || !password) {
        throw new CustomError ("please fill all fields", 400)
    }

    const user = await User.findOne({email}).select("+password -name")

    if(!user) {
        console.log("User not found", user)
        throw new CustomError("Invalid credentials", 400)
    }

    const passwordMatch = await user.comparePassword(password)

    if(!passwordMatch) {
        console.log("Password missmatch")
        throw new CustomError("Password mis match", 400)
    }

    const token = user.getJwtToken()
    user.password - undefined
    res.cookie("token" , token, cookieOptions)

    return res.status(200).json({
        success: true,
        token,
        user
    })
})

exports.logout = asyncHandler (async(req, res, next) => {

    console.log("LOGOUT")


        const newBlacklist = new BlockList({
            token: req.token,
          });
          await newBlacklist.save();

        res.clearCookie()
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly:true,
        })
        res.status(200).json({
            success: true,
            message:"Logged out"
        })
    
})
