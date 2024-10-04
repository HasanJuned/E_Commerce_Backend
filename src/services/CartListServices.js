const CartListModel = require('../models/CartModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const CartListService = async (req) => {
  try {

    let userId = new ObjectId(req.headers.userId);
    let matchStage = {$match: {userId: userId}};

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
    let unwindBrand = {$unwind: '$brand'};

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

    let data = await CartListModel.aggregate([
      matchStage,
      JoinStageProduct,
      unwindProductStage,
      JoinStageBrand,
      unwindBrand,
      JoinStageCategory,
      unwindCategory,
      projectionStage,
    ]);

    return {status: 'success', data: data};

  } catch (e) {
    return {status: 'fail', message: e.message};
  }
};

const CreateCartListService = async (req) => {

  try {

    let userId = req.headers.userId;
    let reqBody = req.body;
    reqBody.userId = userId;

    await CartListModel.create(reqBody);
    return {status: 'success', message: 'Added to Cart'};

  } catch (e) {
    return {status: 'fail', message: e.message};
  }

};

const UpdateCartListService = async (req) => {
  try {
    let userId = req.headers.userId;
    let cartId = req.params.cartId;
    let reqBody = req.body;

    await CartListModel.updateOne({_id: cartId, userId: userId},
        {$set: reqBody});
    return {status: 'success', message: 'Updated'};

  } catch (e) {
    return {status: 'fail', message: e.message};
  }
};

const RemoveCartListService = async (req) => {
  try {
    let userId = req.headers.userId;
    let reqBody = req.body;
    reqBody.userId = userId;

    await CartListModel.deleteOne(reqBody);
    return {status: 'success', message: 'Removed'};

  } catch (e) {
    return {status: 'fail', message: e.message};
  }
};

module.exports = {
  CreateCartListService,
  UpdateCartListService,
  RemoveCartListService,
  CartListService
};



