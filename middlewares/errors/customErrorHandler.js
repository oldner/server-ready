const CustomError = require('../../helpers/error/CustomError');

const customErrorHandler = (err, req, res, next) => {

    let customError = err;
    console.log(err.name);
    if(err.name === 'SynaxError') {
        customError = new CustomError('Unexpected syntax', 400);
    }
    if(err.name === 'ValidationError') {
        customError = new CustomError(customError.message.split(': ')[2], 400);
    }
    if(err.code === 11000) {
        customError = new CustomError('Bu email daha onceden alinmis! Lutfen tekrar deneyin.', 400)
    }
    if(err.kind === 'minlength') {
        customError = new CustomError('Your password cannot be less than 6 char.', 400);
    }
    if(err.status === 401) {
        customError = new CustomError(err.message, err.status);
        console.log(err.message);
    } 

    res
    .status(customError.status || 500)
    .json({
        success: false,
        message: customError.message
    });
};

module.exports = customErrorHandler;