require('dotenv').config();

console.log('Running migration for', process.env.NODE_ENV);

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE_NAME,
      port: process.env.DB_PORT,
      multipleStatements: true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/src/migrations'
    }
  },
  production: {
    client: 'mysql2',
    connection: {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE_NAME,
      port: process.env.DB_PORT,
      multipleStatements: true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/src/migrations',
      disableMigrationsListValidation: process.env.NODE_ENV !== 'production'
    }
  }
};
