

// import connectDB from './connectDB.js';

// const createUserTable = () => {
//   const sql = `
//     CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(100) NOT NULL,
//       email VARCHAR(100) NOT NULL UNIQUE,
//       password VARCHAR(255) NOT NULL,
//       avatar VARCHAR(255) DEFAULT '',
//       mobile BIGINT DEFAULT NULL,
//       refresh_token TEXT DEFAULT '',
//       verify_email BOOLEAN DEFAULT false,
//       last_login_date DATETIME DEFAULT NULL,
//       status ENUM('Active', 'Inactive', 'Suspended') DEFAULT 'Active',
//       address_details INT,
//       shopping_cart INT,
//       orderHistory INT,
//       forgot_password_otp VARCHAR(10) DEFAULT NULL,
//       forgot_password_expire DATETIME DEFAULT NULL,
//       role ENUM('ADMIN', 'User') DEFAULT 'User',
//       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      
//       FOREIGN KEY (address_details) REFERENCES address(id),
//       FOREIGN KEY (shopping_cart) REFERENCES cartProduct(id),
//       FOREIGN KEY (orderHistory) REFERENCES orders(id)
//     )
//   `;

//   connectDB.query(sql, (err, result) => {
//     if (err) {
//       console.error("❌ Error creating users table:", err);
//     } else {
//       console.log("✅ Users table created or already exists");
//     }
//   });
// };

// createUserTable();
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"provide name"]
  },
  email:{
    type:String,
    required:[true,"provide email"],
    unique : true
  },
  password:{
    type:String,
    required:[true,"provide password"]
  },
  avatar:{
    type:String,
    default:""
  },
  mobile:{
    type:Number,
    default:null
  },
  refresh_token:{
    type:String,
    default:""
  },
  verify_email:{
    type:Boolean,
    default:false
  },
  last_login_date:{
    type:Date,
    default:""
  },
  status:{
    type:String,
    enum:["Active","Inactive","Suspended"],
    default:"Active"
  },
  address_details:{
    type:mongoose.Schema.ObjectId,
    ref:"address"
  },
  shoppping_cart:{
    type:mongoose.Schema.ObjectId,
    ref:"cartProduct"
  },
  orderHistory:{
    type:mongoose.Schema.ObjectId,
    ref:"order"
  },
  forgot_password_otp:{
    type:String,
    default:null
  },
  forgot_password_expire:{
    type:Date,
    default:""
  },
  role:{
    type:String,
    enum:['ADMIN',"USer"],
    default:"User"
  }
},{
  timestamps:true
})


const UserModel = mongoose.model("User",userSchema)

export default UserModel 