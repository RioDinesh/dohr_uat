const { createPool } = require("mysql2");

const pool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port:process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10,
  timezone:'Europe/Stockholm'
});

module.exports = pool;