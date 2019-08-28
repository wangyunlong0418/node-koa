
const { ErrorModel } = require('../model/resModel');
module.exports = async (ctx, next) => {
    if (ctx.session.username) {
        await next();
        return;
    }

    return ErrorModel('尚未登录')
}