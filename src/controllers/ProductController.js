const {BrandListService, CategoryListService, SliderListService, ProductListByBrandService, ProductListByCategoryService, ProductListByRemarkService, ProductDetailsService, CreateReviewService, ReviewListService} = require('../services/ProductServices');

exports.ProductBrandList = async (req, res) => {
    try {
        let result = await BrandListService();
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
}

exports.ProductListByCategory = async (req, res) => {
    try {
        let result = await ProductListByCategoryService();
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
}

exports.CategoryList = async (req, res) => {
    try {
        let result = await CategoryListService();
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
}

exports.ProductDetails = async (req, res) => {
    try {
        let result = await ProductDetailsService(req);
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
}

exports.ProductListByRemark = async (req, res) => {
    try {
        let result = await ProductListByRemarkService(req);
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
}

exports.ProductSliderList = async (req, res) => {
    try {
        let result = await SliderListService();
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
}

exports.ProductListByBrand = async (req, res) => {
    try {
        let result = await ProductListByBrandService(req);
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
}

exports.ProductReviewList = async (req, res) => {
    try {
        let result = await ReviewListService(req);
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
}

exports.CreateReview = async (req, res) => {
    try {
        let result = await CreateReviewService(req);
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
}