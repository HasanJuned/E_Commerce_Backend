const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductsController')

router.post('/CreateProduct', ProductController.CreateProduct)
router.get('/ReadProduct', ProductController.ReadProduct)
router.get('/ReadProductById/:id', ProductController.ReadProductById)
router.get('/DeleteProduct/:id', ProductController.DeleteProduct)
router.post('/UpdateProduct/:id', ProductController.UpdateProduct)

module.exports = router;