import mysql2 from 'mysql2';

const connection = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'xinyu',
  database: 'practice',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  maxIdle:10,
  idleTimeout: 30000
});

connection.query('SELECT * FROM customers', (err, result) => {
  if (err) throw err;

  console.log('Data received from Db:');
  console.log(result);
})

connection.query('SELECT * FROM customers WHERE name like ?', ['张%'], (err, result) => {
  if (err) throw err;

  console.log('Data received from Db:');
  console.log(result);
})