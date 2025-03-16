const Product = require('../models/productModel');

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};
const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }
  };
  const addProduct = async (req, res) => {
    try {
      const { name, description, price, image, category, stock } = req.body;
  
      const product = new Product({
        name,
        description,
        price,
        image,
        category,
        stock,
      });
  
      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Failed to add product', error: error.message });
    }
  };
    

module.exports = { getProducts, getProductById, getAllProducts,addProduct };
