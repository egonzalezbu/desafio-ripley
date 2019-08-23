const firebase = require('../services/firebase/firebase');

function validateHeader(req, res, next) {
    //Protect the only the API
    if (req.url.match(/^\/api/)) {
        // If the token is successfully validated against Firebase then we can continue
        firebase.validateToken(req.headers.token).then((_decodedToken) => {
            next();
        }, (_err) => {
            res.status(401).send({error: "Unauthorized"});
        });
    } else {
        next();
    }
}

module.exports = validateHeader;