const Animal = require('../models/animal');
const Category = require('../models/category');

const asyncHandler = require('express-async-handler');

exports.category_list = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: category list');
});

exports.category_detail_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: category detail get');
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: ');
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED');
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED');
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED');
});
