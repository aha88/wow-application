module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './wowapplication.sqlite',   
    },
    useNullAsDefault: true,  
    migrations: {
      directory: './migrations',  
    },
  },
};
