// setupOrderTable.js
import connectDB from './connectDB.js';

const createOrderTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT,
      orderId VARCHAR(100),
      product_details JSON,
      payment_id VARCHAR(100),
      payment_status VARCHAR(50),
      delivery_address JSON,
      delivery_status VARCHAR(50),
      subTotalAmt DECIMAL(10,2),
      totalAmt DECIMAL(10,2),
      invoice_receipt VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `;

  connectDB.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Error creating orders table:", err);
    } else {
      console.log("✅ Orders table created or already exists.");
    }
  });
};

createOrderTable();
