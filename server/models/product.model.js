// import connectDB from './connectDB.js';

// const createProductTable = () => {
//   const sql = `
//     CREATE TABLE IF NOT EXISTS product (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(255),
//       image JSON DEFAULT '[]',
//       category_id INT,
//       sub_category_id INT,
//       unit VARCHAR(50) DEFAULT '',
//       stock INT DEFAULT 0,
//       price DECIMAL(10, 2) DEFAULT NULL,
//       discount DECIMAL(10, 2) DEFAULT NULL,
//       description TEXT DEFAULT '',
//       more_details JSON DEFAULT '{}',
//       publish BOOLEAN DEFAULT TRUE,
//       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

//       FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL,
//       FOREIGN KEY (sub_category_id) REFERENCES sub_category(id) ON DELETE SET NULL
//     )
//   `;

//   connectDB.query(sql, (err, result) => {
//     if (err) {
//       console.error("❌ Error creating product table:", err);
//     } else {
//       console.log("✅ Product table created successfully.");
//     }
//   });
// };

// createProductTable();

import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name:{
    type:String,
  },
  image:{
    type:Array,
    default:[]
  },
  category:{
    type:mongoose.Schema.ObjectId,
    ref:"category"
  },
  subCategory:{
    type:mongoose.Schema.ObjectId,
    ref:"subCategory"
  },
  unit:{
    type:String,
    default:""
  },
  stock:{
    type:Number,
    default:0
  },
  price:{
    type:Number,
    default:null
  },
  discount:{
    type:Number,
    default:null
  },
  description:
  {
    type:String,
    default:""
  },
  more_details:{
    type:Object,
    default:{}
  },
  publish:{
    type:Boolean,
    default:true
  }
},{
  timestamps:true
})

const ProductModel = mongoose.model('product',productSchema)

export default ProductModel 