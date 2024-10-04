const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");
const WishListController = require("../controllers/WishListController");
const CartListController = require("../controllers/CartListController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

// Product
router.get('/ProductBrandList', ProductController.ProductBrandList);
router.get('/ProductCategoryList', ProductController.CategoryList);
router.get('/ProductSliderList', ProductController.ProductSliderList);
router.get('/ProductListByBrand/:BrandId', ProductController.ProductListByBrand);
router.get('/ProductListByCategory/:CategoryId', ProductController.ProductListByCategory);
router.get('/ProductListByRemark/:remark', ProductController.ProductListByRemark);
router.get('/ProductDetails/:ProductId', ProductController.ProductDetails);
router.get('/ProductReviewList/:ProductId', ProductController.ProductReviewList);

// user
router.get('/UserOTP/:email', UserController.UserOTP);
router.get('/VerifyLogin/:email/:otp', UserController.VerifyLogin);
router.get('/UserLogout', AuthMiddleware, UserController.UserLogout);
router.post('/CreateProfile', AuthMiddleware,UserController.CreateProfile);
router.post('/UpdateProfile', AuthMiddleware,UserController.UpdateProfile);
router.get('/ReadProfile', AuthMiddleware, UserController.ReadProfile);

// wish list
router.post('/SaveWishList', AuthMiddleware,WishListController.SaveWishList);
router.post('/RemoveWishList', AuthMiddleware,WishListController.RemoveWishList);
router.get('/WishList', AuthMiddleware,WishListController.WishList);

// cart list
router.get('/CartList', AuthMiddleware,CartListController.CartList);
router.post('/CreateCartList', AuthMiddleware,CartListController.CreateCartList);
router.post('/UpdateCartList/:cartId', AuthMiddleware,CartListController.UpdateCartList);
router.post('/RemoveCartList', AuthMiddleware,CartListController.RemoveCartList);

module.exports = router;