const firebase = require('../services/firebase/firebase');

function validateHeader(req, res, next) {
    firebase.validateToken(req.headers.token).then((_decodedToken) => {
        next();
    }, (_err) => {
        res.status(401).send({error: "Unauthorized"});
    });
}

module.exports = validateHeader;