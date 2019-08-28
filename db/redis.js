const redis = require('redis');
const { redisConfig: { port, host } } = require('../config');

const redisClient = redis.createClient(port, host);

redisClient.on('error', (err) => {
    console.error(err);
})



const setKey = (key, value) => {
    if (!key) {
        return;
    }

    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }

    redisClient.set(key, value, redis.print);
}

const getKey = (key) => {
    const promise = new Promise((resolve, reject) => {
        if (!key) {
            reject({ status: false, msg: '请使用正确的key' });
        }

        redisClient.get(key, (err, val) => {
            if (err) {
                reject({ status: false, msg: '获取失败', err: err });
            }

            if (val === null) {
                resolve(null);
                return;
            }

            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (error) {
                resolve(val);
            }
        })
    })

    return promise;
}

module.exports = {
    setKey,
    getKey
}