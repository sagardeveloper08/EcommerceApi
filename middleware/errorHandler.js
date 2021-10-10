function errorHandler(err, req, res, next) {
    if (err.name === 'unauthorizedError') {
        res.status(401).json({ messgae: "user not Authorized" })
    }
    if (err.name === 'validationError')
    {
            res.status(400).json({messgae:err})
    }

    res.status(500).json({message:err})
}

module.exports = errorHandler