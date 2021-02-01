const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/products.controller')


router.get('/products', ProductsController.getAll);

router.get('/products/random', ProductsController.getRandom );

router.get('/products/:id', ProductsController.getProductById );

router.post('/products', ProductsController.postNewProduct);

router.put('/products/:id', ProductsController.modifyProductById );

router.delete('/products/:id', ProductsController.deleteProductById );

module.exports = router;
