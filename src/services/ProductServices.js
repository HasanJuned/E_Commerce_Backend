const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const ProductSliderModel = require("../models/ProductSliderModel");
const ProductModel = require("../models/ProductModel");
const ReviewModel = require("../models/ReviewModel");
const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

const BrandListService = async () => {
    try {
        let data = await BrandModel.find();
        return {status: 'success', data: data}

    } catch (e) {
        return {status: 'fail', data: e}.toString()
    }
}

const CategoryListService = async () => {
    try {
        let data = await CategoryModel.find()
        return {status: 'success', data: data}

    } catch (e) {
        return {status: 'fail', data: e}.toString()
    }
}

const SliderListService = async () => {

    try {
        let data = await ProductSliderModel.find()
        return {status: 'success', data: data}

    } catch (e) {
        return {status: 'fail', data: e}.toString()
    }
}

const ProductListByBrandService = async (req) => {

    try {
        let BrandId = new ObjectId(req.params.BrandId);
        let MatchStage = {$match: {brandId: BrandId}};
        let JoinWithBrandStage = {$lookup: {from: 'brands', localField: 'brandId', foreignField: '_id', as: 'brand'}};

        let JoinWithCategoryStage = {
            $lookup: {
                from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category'
            }
        };

        let UnwindBrandStage = {$unwind: '$brand'}; /// arraywise hobe na
        let UnwindCategoryStage = {$unwind: '$category'};

        let ProjectionStage = {$project: {'brandId': 0, 'categoryId': 0, 'brand.id': 0, 'category.id': 0}}; // egula json output ey hidden takbe

        let data = await ProductModel.aggregate([MatchStage, JoinWithBrandStage, JoinWithCategoryStage, UnwindBrandStage, UnwindCategoryStage, ProjectionStage

        ])
        return {status: 'success', data: data};


    } catch (e) {
        return {status: 'fail', data: e}.toString()
    }
}

const ProductListByCategoryService = async (req) => {
    try {
        let CategoryID = new ObjectId(req.params.CategoryId);
        let MatchStage = { $match: { categoryID: CategoryID } };

        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" };
        let UnwindCategoryStage = { $unwind: "$category" };
        let ProjectionStage = { $project: { 'categoryId': 0, 'brandId': 0 } };

        let data = await ProductModel.aggregate([
            MatchStage, JoinWithBrandStage, JoinWithCategoryStage,
            UnwindBrandStage, UnwindCategoryStage, ProjectionStage
        ]);
        return { status: "success", data: data };

    } catch (e) {
        return { status: 'fail', data: e.toString()};
    }
};

const ProductListByRemarkService = async (req) => {

    try {
        let Remark = req.params.remark;
        let MatchStage = {$match: {remark: Remark}};

        let JoinWithBrandStage = {$lookup: {from: 'brands', localField: 'brandId', foreignField: '_id', as: 'brand'}};
        let JoinWithCategoryStage = {
            $lookup: {
                from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category'
            }
        };

        let UnwindBrandStage = {$unwind: '$brand'}; /// arraywise hobe na
        let UnwindCategoryStage = {$unwind: '$category'};

        let ProjectionStage = {$project: {'brandId': 0, 'categoryId': 0, 'brand.id': 0, 'category.id': 0}}; // egula json output ey hidden takbe

        console.log('hi')
        let data = await ProductModel.aggregate([MatchStage, JoinWithBrandStage, JoinWithCategoryStage, UnwindBrandStage, UnwindCategoryStage, ProjectionStage,

        ],)
        console.log(data)
        return {status: 'success', data: data};


    } catch (e) {
        return {status: 'fail', data: e}.toString()
    }
}

const ProductDetailsService = async (req) => {
    try {
        let ProductId = new ObjectId(req.params.ProductId);
        let MatchStage = {$match: {_id: ProductId}};

        let JoinWithBrandStage = {$lookup: {from: 'brands', localField: 'brandId', foreignField: '_id', as: 'brand'}};
        let JoinWithCategoryStage = {
            $lookup: {
                from: 'categories',
                localField: 'categoryId',
                foreignField: '_id',
                as: 'category'
            }
        };
        let JoinWithDetailsStage = {
            $lookup: {
                from: 'productdetails',
                localField: '_id',
                foreignField: 'productId',
                as: 'details'
            }
        };

        let UnwindBrandStage = {$unwind: '$brand'};
        let UnwindCategoryStage = {$unwind: '$category'};
        let UnwindDetailsStage = {$unwind: "$details"}

       // let ProjectionStage = {$project: {'brand._id': 1, 'category._id': 0, 'categoryID': 0, 'brandID': 0}}

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            JoinWithDetailsStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            UnwindDetailsStage,
            ProjectionStage,

        ])
        return {status: 'success', data: data};


    } catch (e) {
        return {status: 'fail', data: e}.toString()
    }
}

const CreateReviewService = async (req) => {
    try {
        let userId = req.headers.userId; /// eikhane bejal ase
        let reqBody = req.body;

        let data = await ReviewModel.create({
            productId: reqBody.productId,
            userId: reqBody.userId,
            description: reqBody.description,
            rating: reqBody.rating,

        })
        return {status: 'success', data: data};

    } catch (e) {
        return {status: 'fail', data: e}.toString()
    }
}

const ReviewListService = async (req) => {
    try {

        let ProductId = new ObjectId(req.params.ProductId);
        let MatchStage = {$match: {productId: ProductId}};

        let JoinWithProfileStage = {
            $lookup: {
                from: 'profiles',
                localField: 'userId',
                foreignField: 'userId',
                as: 'profile'
            }
        };
        let UnwindProfileStage = {$unwind: '$profile'};
        let ProjectionStage = {$project: {'description': 1, 'rating': 1, 'profile.cus_name': 1}};

        let data = await ReviewModel.aggregate([
            MatchStage,
            JoinWithProfileStage,
            UnwindProfileStage,
            ProjectionStage,
        ])
        return {status: 'success', data: data};


    } catch (e) {
        return {status: 'fail', data: e}.toString()
    }
}

module.exports = {
    BrandListService,
    CategoryListService,
    SliderListService,
    ProductListByBrandService,
    ProductListByRemarkService,
    ProductListByCategoryService,
    ProductDetailsService,
    CreateReviewService,
    ReviewListService

}


