const router = require('koa-router')();
const { getBlogList } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.prefix('/blog');

router.get('/list', async (ctx, next) => {
    const result = await getBlogList();
    ctx.body = new SuccessModel(result)
})




module.exports = router;