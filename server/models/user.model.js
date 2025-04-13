// setupUserTable.js
import connectDB from './connectDB.js';

const createUserTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      avatar VARCHAR(255),
      mobile VARCHAR(15),
      refresh_token TEXT,
      verify_email BOOLEAN DEFAULT FALSE,
      last_login_date DATETIME,
      status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
      address_details JSON,
      shopping_cart JSON,
      orderHistory JSON,
      forgot_password_otp VARCHAR(10),
      forgot_password_expiry DATETIME,
      role ENUM('user', 'admin') DEFAULT 'user',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  connectDB.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Error creating users table:", err);
    } else {
      console.log("✅ Users table created or already exists.");
    }
  });
};

createUserTable();
