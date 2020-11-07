const asyncErrorWrapper = require('express-async-handler')
const User = require('../models/user/User')
const CustomError = require('../helpers/error/CustomError')
const {sendJwtToClient} = require('../helpers/authentication/tokenHelper')
const {validateUserInput, comparePassword} = require('../helpers/input/inputHelper')

const login = asyncErrorWrapper(async (req, res, next) => {

    console.log(req.body)

    const {name, email, password } = req.body;

    if(!validateUserInput) {
        return next(new CustomError('Please enter valid email and password', 400))
    }

    const user = await User.findOne({email}).select('+password')

    if(!comparePassword(password, user.password)) {
        return next(new CustomError('Please check your email and password', 400))
    }

    sendJwtToClient(user, res)
})

module.exports = login