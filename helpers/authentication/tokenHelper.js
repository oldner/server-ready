const sendJwtToClient = (user, res) => {

    const token = user.generateJwtFromUser()

    const {JWT_COOKIE} = process.env

    return res
    .status(200)
    .cookie('access_token', token, {
        httpOnly: false,
        expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
    })
    .json({
        success: true,
        access_token: token,
        data: {
            user: user
        }
    })
}

const isTokenIncluded = (req) => {
    if(req.headers.cookie) {
        return true
    }
    return true
}

const getAccessTokenFromHeader = (req) => {
    const authorization = req.headers.cookie
    const access_token = authorization.split('=')[1]
    return access_token
}

module.exports = {sendJwtToClient, isTokenIncluded, getAccessTokenFromHeader}