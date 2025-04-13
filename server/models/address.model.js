// setupAddressTable.js
import connectDB from './connectDB.js';

const createAddressTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS address (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT,
      address_line VARCHAR(255),
      city VARCHAR(100),
      state VARCHAR(100),
      pincode VARCHAR(10),
      country VARCHAR(100),
      mobile VARCHAR(15),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `;

  connectDB.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Error creating address table:", err);
    } else {
      console.log("✅ Address table created or already exists.");
    }
  });
};

createAddressTable();
