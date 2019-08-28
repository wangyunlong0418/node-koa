
const env = process.env.NODE_ENV;
const SECRET_KEY = 'luxixi0404-0707';

const mysqlConf = {
    dev: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'myblog'
    },
    production: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'myblog'
    },
}

const redisConf = {
    dev: {
        port: 6379,
        host: '127.0.0.1'
    },
    production: {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    port: 3002,
    secretKey: SECRET_KEY,
    mysqlConfig: mysqlConf[env] || mysqlConf['dev'],
    redisConfig: redisConf[env] || redisConf['dev']
}