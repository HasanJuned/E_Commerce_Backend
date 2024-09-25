const BrandModel = require("./models/Brand");
const CategoryModel = require("./models/Category");
const ProductSliderModel = require("./models/ProductSlider");
const ProductModel = require("./models/Product");
const ReviewModel = require("./models/Review");

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
        let JoinWithMatchStage = {$lookup: {from: 'brands', localField: 'brandId', foreignField: '_id', as: 'brand'}};

        let JoinWithCategoryStage = {
            $lookup: {
                from: 'category', localField: 'categoryId', foreignField: '_id', as: 'category'
            }
        };

        let UnwindBrandStage = {$unwind: 'brand'}; /// arraywise hobe na
        let UnwindCategoryStage = {$unwind: 'category'};

        let ProjectionStage = {$project: {'brandId': 0, 'categoryId': 0, 'brand.id': 0, 'category.id': 0}}; // egula json output ey hidden takbe

        let data = await ProductModel.aggregate([MatchStage, JoinWithMatchStage, JoinWithCategoryStage, UnwindBrandStage, UnwindCategoryStage, ProjectionStage,

        ],)
        return {status: 'success', data: data};


    } catch (e) {
        return {status: 'fail', data: e}.toString()
    }
}

const ProductListByCategoryService = async (req) => {

    try {
        let CategoryId = new ObjectId(req.params.CategoryId);
        let MatchStage = {$match: {categoryId: CategoryId}};
        let JoinWithMatchStage = {$lookup: {from: 'brands', localField: 'brandId', foreignField: '_id', as: 'brand'}};

        let JoinWithCategoryStage = {
            $lookup: {
                from: 'category', localField: 'categoryId', foreignField: '_id', as: 'category'
            }
        };

        let UnwindBrandStage = {$unwind: 'brand'}; /// arraywise hobe na
        let UnwindCategoryStage = {$unwind: 'category'};

        let ProjectionStage = {$project: {'brandId': 0, 'categoryId': 0, 'brand.id': 0, 'category.id': 0}}; // egula json output ey hidden takbe

        let data = await ProductModel.aggregate([MatchStage, JoinWithMatchStage, JoinWithCategoryStage, UnwindBrandStage, UnwindCategoryStage, ProjectionStage,

        ],)
        return {status: 'success', data: data};


    } catch (e) {
        return {status: 'fail', data: e}.toString()
    }
}

const ProductListByRemarkService = async (req) => {

    try {
        let Remark = req.params.Remark;
        let MatchStage = {$match: {remark: Remark}};
        let JoinWithMatchStage = {$lookup: {from: 'brands', localField: 'brandId', foreignField: '_id', as: 'brand'}};

        let JoinWithCategoryStage = {
            $lookup: {
                from: 'category', localField: 'categoryId', foreignField: '_id', as: 'category'
            }
        };

        let UnwindBrandStage = {$unwind: 'brand'}; /// arraywise hobe na
        let UnwindCategoryStage = {$unwind: 'category'};

        let ProjectionStage = {$project: {'brandId': 0, 'categoryId': 0, 'brand.id': 0, 'category.id': 0}}; // egula json output ey hidden takbe

        let data = await ProductModel.aggregate([MatchStage, JoinWithMatchStage, JoinWithCategoryStage, UnwindBrandStage, UnwindCategoryStage, ProjectionStage,

        ],)
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
                from: 'productDetails',
                localField: '_id',
                foreignField: 'productId',
                as: 'details'
            }
        };

        let UnwindBrandStage = {$unwind: '$brand'};
        let UnwindCategoryStage = {$unwind: '$category'};
        let UnwindDetailsStage = {$unwind: "$details"}

        let ProjectionStage = {$project: {'brand._id': 0, 'category._id': 0, 'categoryID': 0, 'brandID': 0}}

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


