const admin = require('firebase-admin');
const serviceAccount = require("./adminsdk.json");

// Credentials should not be in GIT, only for test purposes
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://desafio-ripley.firebaseio.com"
});

// Return the validated Token
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