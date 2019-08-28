const xss = require('xss');
const { exec } = require('../db/mysql')
const getBlogList = async (author, keyword) => {
    let sql =  `SELECT * FROM blogs WHERE 1=1 `;

    if (author) {
        sql  += `AND author='${author}' `;
    }

    if (keyword) {
        sql  += `AND title LIKE '%${keyword}%' `;
    }

    sql += `ORDER BY createtime DESC;`;

    return await exec(sql);
}

const getDetail = async (id) => {
    let sql = `SELECT * FROM blogs WHERE id='${id}'`;
    return await exec(sql);
}

const createBlog = async (blogData = {}, username) => {
    const { title, content } = blogData;
    const createTime = new Date().getTime();
    
    let sql = `INSERT INTO blogs(title, content, createtime, author) VALUES('${xss(title)}','${content}', '${createTime}', '${username}')`;
    return await exec(sql);
}

const updateBlog = async (id, blogData = {}) => {
    const { title, content } = blogData;
    const sql = `UPDATE blogs SET title='${title}', content='${content}' WHERE id=${id}`;

    if (id) {
        return exec(sql).then((result) => {
            if (result.affectedRows > 0) {
                return true;
            }
    
            return false;
        })
    }

    return Promise.reject(false);
}

const deleteBlog = (id) => {
    const sql = `DELETE FROM blogs WHERE id=${id};`
    if (id) {
        return exec(sql).then((result) => {
            if (result.affectedRows > 0) {
                return true;
            }
    
            return false;
        })
    }

    return Promise.reject(false);
}


module.exports = {
    getBlogList,
    getDetail,
    createBlog,
    updateBlog,
    deleteBlog
}