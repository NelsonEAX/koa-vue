const Koa = require('koa');
const mongo = require('koa-mongo');
const config = require('./config');
const router = require('./routes');
const app = new Koa();

app.use(mongo(config.database));

app.use(router.routes());
app.use(router.allowedMethods());

if (process.env.NODE_ENV === 'production') {
  require('./utils/setup-prod.js')(app);
} else {
  require('./utils/setup-dev.js')(app);
}

app.listen(process.env.PORT || config.server.port || 3000, () => {
  console.log('%s listening at port %d', config.app.name, config.server.port);
});
