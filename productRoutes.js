const express = require('express');
const router = express.Router();
const { getProducts, getProductById, getAllProducts,addProduct } = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/', getAllProducts);
router.post('/add',addProduct);

module.exports = router;
