const knex = require('knex');

const db = knex.default({
  client: 'mysql2',
  connection: {
    user: 'pupp',
    password: 'password1234', // test password
    host: '127.0.0.1',
    port: 3306,
    database: 'express_webboard',
    timezone: '+00:00',
  },
});

module.exports = db;
