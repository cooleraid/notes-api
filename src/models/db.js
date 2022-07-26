const Knex = require('knex');
const knex = Knex({
  client: 'mysql2',
  useNullAsDefault: true,
  connection: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DB_PORT,
    decimalNumbers: true
  },
  pool: {
    min: 0,
    max: 150,
    createTimeoutMillis: 3000,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    propagateCreateError: false
  }
});

module.exports = knex;
