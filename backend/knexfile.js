const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, process.env.DATABASE_SQLITE),
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, process.env.MIGRATION_FILE),
    },
  },
  production: {
    // Use 'mysql2' for MySQL or 'pg' for PostgreSQL
    client: 'mysql2', 
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',  
      user: process.env.DB_USER || 'your_user',
      password: process.env.DB_PASSWORD || 'your_password',
      database: process.env.DB_NAME || 'your_database',
      ssl: { rejectUnauthorized: false }, 
    },
    migrations: {
      directory: path.resolve(__dirname, process.env.MIGRATION_FILE),
    },
    pool: {
      min: 2,
      max: 10, 
    },
  },
};
