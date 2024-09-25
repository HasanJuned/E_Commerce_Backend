const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

// Product
router.get('/ProductBrandList', ProductController.ProductBrandList);
router.get('/ProductCategoryList', ProductController.ProductListByCategory);
router.get('/ProductSliderList', ProductController.ProductSliderList);
router.get('/ProductListByBrand/:BrandId', ProductController.ProductListByBrand);
router.get('/ProductListByCategory/:CategoryId', ProductController.ProductListByCategory);
router.get('/ProductListByRemark/:Remark', ProductController.ProductListByRemark);
router.get('/ProductDetails/:ProductId', ProductController.ProductDetails);
router.get('/ProductReviewList/:ProductId', ProductController.ProductReviewList);
router.get('/ProductBrandList', ProductController.ProductBrandList);

module.exports = router;