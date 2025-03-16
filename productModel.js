const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String},
  description: { type: String },
  price: { type: Number },
  image: { type: String },
  category: { type: String },
  stock: { type: Number},
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
