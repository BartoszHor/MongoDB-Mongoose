const express = require('express');
const router = express.Router();
const Product = require('../models/products.model')


router.get('/products', async (req, res) => {
  try {
    res.json( await Product.find())
  } catch(err) {
    res.status(500).json({message: err})
  }

});

router.get('/products/random', async (req, res) => {
  try {
    const product = await Product.findOne().skip(Math.floor(Math.random() * await Product.countDocuments()))
    if(!product) res.status(404).json({message: 'Not found'})
    else res.json(product)
  } catch(err) {
    res.status(500).json({message: err})
  }

});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if(!product) res.status(404).json({message: 'Not found'})
    else res.json(product)
  } catch(err) {
    res.status(500).json({message: err})
  }
});

router.post('/products', async (req, res) => {
  try {
    const {name, client} = req.body
    const newproduct = new Product({name: name, client: client})    
    newproduct.save()
    res.json({message: 'OK'})
  } catch(err) {
    res.status(500).json({message: err})
  }
 
});

router.put('/products/:id', async (req, res) => {
  const {name, client} = req.body
  try {
  const product = await(product.findById(req.params.id))
    if(product) {
      product.name = name
      product.client = client
      await product.save()
      res.json({message: 'OK'})
    } 
    else res.status(404).json({message: 'Not found'})
  } 
  catch(err) {
    res.status(500).json({message: err})
  }

});

router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      if(product) {
        await product.remove()
        res.json({message: 'OK'})
      } 
      else res.status(404).json({message: 'Not found'})
    } 
    catch(err) {
      res.status(500).json({message: err})
    }
});

module.exports = router;
