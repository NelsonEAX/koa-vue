const Router = require('koa-router');
const KoaBody = require('koa-body');
const convert = require('koa-convert');
const config = require('./config');

const router = new Router(),
    koaBody = convert(KoaBody());

router
    .get('/product', async (ctx, next) => {
        ctx.body = await product.getAll()
    })
    .get('/product/:id', async (ctx, next) => {
        let result = await product.get(ctx.params.id);
        if (result) {
            ctx.body = result
        } else {
            ctx.status = 204
        }
    })
    .post('/donate', koaBody, async (ctx, next) => {
        ctx.status = 201;
        ctx.body = { test: '123'}
    })
    .post('/settings', koaBody, async (ctx, next) => {
        ctx.status = 200;
        ctx.type = 'application/json';
        const settings = await ctx.db.collection('settings').find().toArray();
        if (settings[0]) {
            // Use settings from db
            ctx.body = settings[0];
        } else {
            // Insert default settings
            await ctx.db.collection('settings').insert(config.settings);
            ctx.body = config.settings;
        }
    })
    .post('/test', koaBody, async (ctx, next) => {
        ctx.status = 201;
        ctx.body = { test: '123'}
    });

module.exports = router;
