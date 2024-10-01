const WishListModel = require('../models/WishModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const WishListServices = async (req) => {
  try {
    let userId = new ObjectId(req.headers.userId);
    let matchStage = {$match: {userId: userId}};
    console.log(userId);

    let JoinStageProduct = {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'product',
      },
    };
    let unwindProductStage = {$unwind: '$product'};

    let JoinStageBrand = {
      $lookup: {
        from: 'brands',
        localField: 'product.brandId',
        foreignField: '_id',
        as: 'brand',
      },
    };
    let unwindBrandStage = {$unwind: '$brand'};

    let JoinStageCategory = {
      $lookup: {
        from: 'categories',
        localField: 'product.categoryId',
        foreignField: '_id',
        as: 'category',
      },
    };
    let unwindCategory = {$unwind: '$category'};

    let projectionStage = {
      $project: {
        '_id': 0,
        'userId': 0,
        'createdAt': 0,
        'updatedAt': 0,
        'product._id': 0,
        'product.categoryId': 0,
        'product.brandId': 0,
        'brand._id': 0,
        'category._id': 0,
      },
    };

    let data = await WishListModel.aggregate([
      matchStage,
      JoinStageProduct,
      unwindProductStage,
      JoinStageBrand,
      unwindBrandStage,
      JoinStageCategory,
      unwindCategory,
      projectionStage,

    ]);
    return {status: 'success', data: data};

  } catch (e) {
    return {status: 'fail', message: e.message};
  }
};

const SaveWishListService = async (req) => {
  try {
    let userId = req.headers.userId;
    let reqBody = req.body;
    reqBody.userId = userId;
    console.log(reqBody);

    await WishListModel.updateOne(reqBody, {$set: reqBody}, {upsert: true});
    return {status: 'success', message: 'Wishlist Saved'};

  } catch (e) {
    return {status: 'fail', message: e.message};
  }
};

const RemoveWishListService = async (req) => {
  try {
    let userId = req.headers.userId;
    let reqBody = req.body;
    reqBody.userId = userId;

    await WishListModel.deleteOne(reqBody);
    return {status: 'success', message: 'Wishlist Removed'};

  } catch (e) {
    return {status: 'fail', message: e.message};
  }
};

module.exports = {
  WishListServices,
  SaveWishListService,
  RemoveWishListService,
};
