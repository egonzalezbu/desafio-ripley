const axios = require('axios');
const APIURL = "https://simple.ripley.cl/api/v2/products/";

// Error rate percentaje
const ERROR_RATE = 0.15;

// Get products from an array of PartNumbers
function getProductsByPartNumbers(partNumbers) {
    return new Promise((resolve, reject) => {
        // Function that will be called until succeed
        function tryRequest() {
            _requestWithError(APIURL + "?partNumbers=" + partNumbers.default.join(",")).then((response) => {
                resolve(response.data);
            }, (err) => {
                console.log("ERROR: Simulated Request Error");
                tryRequest()
            });
        }
        // Initial call
        tryRequest();
    });
}

// Get product from PartNumber
function getProductByPartNumber(partNumber) {
    return new Promise((resolve, reject) => {
        // Function that will be called until succeed
        function tryRequest() {
            _requestWithError(APIURL + partNumber).then((response) => {
                resolve(response.data);
            }, (err) => {
                tryRequest()
            });
        }
        // Initial call
        tryRequest();
    });
}

// Helper function to simulat an error rate
function _requestWithError(url) {
    return new Promise((resolve, reject) => {
        // Get random value for error
        const randErr = Math.random();
        if(randErr > ERROR_RATE) {
            // If there's no simulated error then we do the request
            axios.get(url).then((response) => {
                resolve(response);
            }, (err) => {
                reject(err);
            });
        } else {
            // Reject by simulated error
            reject();
        }
    });
}

module.exports = {
    getProductsByPartNumbers,
    getProductByPartNumber
}