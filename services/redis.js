const redis = require("redis");

const OPTIONS = {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379
};
const EX = 120;

const client = redis.createClient(OPTIONS);

client.on("error", function(err) {
    console.log(err);
});

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

function set(key, value) {
    return new Promise((resolve, reject) =>{
        client.set(key, value, 'EX', EX, (err, res) => {
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