const admin = require('firebase-admin');
const serviceAccount = require("./adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://desafio-ripley.firebaseio.com"
});

function validateToken(token) {
    return new Promise((resolve, reject) => {
        admin.auth().verifyIdToken(token)
        .then(function(decodedToken) {
            resolve(decodedToken);
        }).catch(function(error) {
            reject(error);
        });
    });
}

module.exports = {
    validateToken
};