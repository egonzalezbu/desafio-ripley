const redis = require("redis");

const OPTIONS = {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || null
};

// Redis EXPIRE Time in Seconds
const EX = 120;

const client = redis.createClient(OPTIONS);

client.on("error", function(err) {
    console.log(err);
});

// Retrieve value of key from Redis
function get(key) {
    return new Promise((resolve, reject) => {
        client.get(key, (err, reply) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(reply);
        });
    });
}

// Set value of key from Redis
function set(key, value) {
    return new Promise((resolve, reject) =>{
        client.set(key, JSON.stringify(value), 'EX', EX, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}

module.exports = {
    get,
    set
};