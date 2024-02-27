
const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {

    let error = { ...err }
    //log for dev

    error.message = err.message
    console.log(err)

    console.log(err.name.blue)
    if (err.name == 'CastError') {
        error = new ErrorResponse(message, 404)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'server err'
    })
}

module.exports = errorHandler; 