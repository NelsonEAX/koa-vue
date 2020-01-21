const Router = require('koa-router');
const KoaBody = require('koa-body');
const config = require('./config');

const router = new Router();

router
    .post('/donate', KoaBody(), async (ctx, next) => {
        const body = JSON.parse(ctx.request.body);
        const currency = await ctx.db.collection('settings')
            .find({'currencies.code': body.currency || ''}).toArray();

        if (currency.length && body.amount > 0) {
            console.log('donate allow', {amount: body.amount, currency: body.currency});
            await ctx.db.collection('donations')
                .insertOne({amount: parseInt(body.amount, 10), currency: body.currency});
            ctx.status = 201;
            ctx.body = { "ok": true }
        } else {
            console.log('donate NOT allow');
            ctx.status = 200;
            ctx.body = { "ok": false }
        }
    })
    .post('/settings', KoaBody(), async (ctx, next) => {
        ctx.status = 200;
        ctx.type = 'application/json';
        const settings = await ctx.db.collection('settings').find().toArray();
        if (settings[0]) {
            // Use settings from db
            ctx.body = settings[0];
        } else {
            // Insert default settings
            await ctx.db.collection('settings').insertOne(config.settings);
            ctx.body = config.settings;
        }
    });

module.exports = router;
