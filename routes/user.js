const router = require('koa-router')()

router.prefix('/user');

router.get('/test', async (ctx, next) => {
    if (ctx.session.viewCount === null) {
        ctx.session.viewCount = 0;
    }

    ctx.session.viewCount ++;

    ctx.body = {
        code: 0,
        data: {
            viewCount: ctx.session.viewCount
        }
    }
})

module.exports = router;