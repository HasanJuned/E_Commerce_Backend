const {CartListService, CreateCartListService, UpdateCartListService, RemoveCartListService} = require('../services/CartListServices');

exports.CartList=async (req, res) => {
  let result = await CartListService(req);
  return res.status(200).json(result);
}

exports.CreateCartList = async (req, res) => {
  let result = await CreateCartListService(req);
  return res.status(200).json(result);
}

exports.UpdateCartList = async (req, res) => {
  let result = await UpdateCartListService(req);
  return res.status(200).json(result);
}

exports.RemoveCartList = async (req, res) => {
  let result = await RemoveCartListService(req);
  return res.status(200).json(result);
}