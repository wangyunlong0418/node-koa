const { exec, escape } = require('../db/mysql');
const login = (userInfo = {}) => {
    const { username, password } = userInfo;

    const sql = `SELECT username, realname, userid FROM users 
                WHERE username=${escape(username)} AND password=${escape(password)}`;
    if (username) {
        return exec(sql).then((rows) => {
            return rows[0];
        })
    }

    return Promise.reject(false);
}

module.exports = {
    login
}