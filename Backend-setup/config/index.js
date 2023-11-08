const { version } = require('../package.json');

module.exports = {
    VERSION: version,
    DOMAIN: process.env.DOMAIN,
    SERVER: {
        host: process.env.HOST || "0.0.0.0",
        port: process.env.PORT || 3002
    },
    DATABASE: {
        name: process.env.DB_NAME || "backend_db",
        username: process.env.DB_USER_NAME || "postgres",
        password: process.env.DB_PASSWORD || "123456",
        options: {
            host: process.env.DB_HOST || "localhost",
            port: process.env.DB_PORT || 5432,
            dialect: "postgres",
            freezeTableName: true,
            define: {
              timestamps: false,
              charset: "utf8",
              collate: "utf8_general_ci",
            },
            pool: {
              max: 100,
              min: 0,
              acquire: 1000 * 100,
              idle: 1000,
            },
            dialectOptions: {
              decimalNumbers: true,
              charset: "utf8mb4",
            },
            logging: false,
          },
    }
}