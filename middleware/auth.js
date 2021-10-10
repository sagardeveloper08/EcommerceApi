const expressJwt = require('express-jwt')

function authJwt() {
    const secret = process.env.secert
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            '/api/user/getproduct',
            '/api/user/login',
            '/api/user/registration',

        ]
    })
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null,true)
    }
    done()
}


module.exports = authJwt