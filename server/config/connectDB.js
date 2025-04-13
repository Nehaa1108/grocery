// import mysql from 'mysql2';
// import dotenv from 'dotenv';
// dotenv.config();


// const connectDB = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT
// });

// connectDB.connect((err) => {
//   if (err) {
//     console.error('❌ Database connection failed:', err.stack);
//     return;
//   }
//   console.log('✅ Connected to MySQL DB');
// });

// export default connectDB;

// // connection.query('SELECT * FROM users', (err, results) => {
// //   if (err) throw err;
// //   console.log(results);
// // });

import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
  });

  connection.connect((err) => {
    if (err) {
      console.error('❌ Database connection failed:', err.stack);
      return;
    }
    console.log('✅ Connected to MySQL DB...');
  });

  return connection;
};

export default connectDB;
