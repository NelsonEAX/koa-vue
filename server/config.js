module.exports = {
    app: {
        name: 'vue-koa-test',
        version: '0.1.0'
    },
    server: {
        port: 3000
    },
    database: {
        host: 'localhost',
        port: 27017,
        user: 'admin',
        pass: '12345678',
        db: 'testdb',
        authSource: 'admin',
        max: 100,
        min: 1,
    },
    settings: {
        presets: [40, 100, 200, 1000, 2500, 5000],
        suggestion: 40,
        currencies: [
            {name: "US Dollar", code: "USD", symbol: "$", rate: 1},
            {name: "Euro", code: "EUR", symbol: "€", rate: 0.897597},
            {name: "British Pound", code: "GBP", symbol: "£", rate: 0.81755},
            {name: "Russian Ruble", code: "RUB", symbol: "₽", rate: 63.461993}
        ]
    }
};
