const redis = require('./redis');
const ripley = require('./ripley');

// Get All Products
function getAllProducts(products) {
    return new Promise((resolve, reject) => {
        // Try to read from Redis
        redis.get('allProducts').then((cachedProducts) => {
            if (cachedProducts) {
                // Return cached products if present
                resolve(cachedProducts);
            } else {
                // Retrieve from simple.ripley.cl API the products
                ripley.getProductsByPartNumbers(products).then((products) => {
                    // Store the products information in Redis without blocking the response
                    redis.set('allProducts', products);
                    resolve(products);
                }, (err) => {
                    reject(err);
                });
            }
        }, (err) => {
            reject(err);
        });
    });
}

// Get a product from the SKU
function getProduct(SKU) {
    return new Promise((resolve, reject) => {
        // Try to read from Redis
        redis.get(SKU).then((cachedProduct) => {
            if (cachedProduct) {
                // Return cached product if present
                resolve(cachedProduct);
            } else {
                // Retrieve from simple.ripley.cl API the product
                ripley.getProductByPartNumber(SKU).then((product) => {
                    // Store the product information in Redis without blocking the response
                    redis.set(SKU, product);
                    resolve(product);
                }, (err) => {
                    reject(err);
                });
            }
        });
    });
}

module.exports = {
    getAllProducts,
    getProduct
};