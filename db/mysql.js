const mysql = require('mysql2/promise');
const { mysqlConfig } = require('../config');

const connection = mysql.createConnection(mysqlConfig);
const exec = (sql) => {
    const promise = new Promise((resolve, reject) => {
        connection.then((conn) => {
            conn.execute(sql).then(([rows, fields]) => {
                resolve(rows);
            })
        }).catch((err) => {
            reject(err);
        })
    })

    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}