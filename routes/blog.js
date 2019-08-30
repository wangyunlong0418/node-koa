const router = require('koa-router')();
const { getBlogList, getDetail } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.prefix('/blog');

router.get('/list', async (ctx, next) => {
    const result = await getBlogList();
    ctx.body = new SuccessModel(result)
})

router.get('/detail/:id', async(ctx, next) =>{
    const { id } = ctx.params;
    const result = await getDetail(id);
    ctx.body = new SuccessModel(result[0]);
})




module.exports = router;