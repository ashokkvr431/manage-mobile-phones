const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',         
  password: '',         
  database: 'mobiles_db',
  dialect: "mysql"
});

connection.connect((err) => {
  if (err) {
    console.error(' Database connection failed:', err.stack);
    return;
  }
  console.log(' Connected to MySQL as ID', connection.threadId);
});

module.exports = connection;
