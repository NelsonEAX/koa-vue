# Koa + Vue

#### Before start need change MongoDB connection settings:

``` bash
# .\server\config.js
database: {
    host: 'localhost',
    port: 27017,
    user: 'admin',
    pass: '12345678',
    db: 'testdb',
},
```

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production with minification
npm run build
```

