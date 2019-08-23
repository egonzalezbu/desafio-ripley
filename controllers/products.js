const remote = require('../services/remote/remote');

// Static file with the test SKUs
const SKUs = require('../services/sku');

// Method for getting al products
function getAllProducts() {
    return new Promise((resolve, reject) => {
        remote.getAllProducts(SKUs).then((products) => {
            resolve(products);
        }, (err) => {
            reject(err);
        });
    });
}

// Method for getting a product from the SKU
function getProduct(SKU) {
    return new Promise((resolve, reject) => {
        remote.getProduct(SKU).then((product) => {
            resolve(product);
        }, (err) => {
            reject(err);
        });
    });
}

module.exports = {
    getAllProducts,
    getProduct
}