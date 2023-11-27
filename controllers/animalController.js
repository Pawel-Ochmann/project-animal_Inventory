const Animal = require('../models/animal');
const Category = require('../models/category');

const asyncHandler = require('express-async-handler');

exports.animal_list = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED' );
})

exports.animal_detail_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED');
});

exports.animal_detail_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED');
});

exports.animal_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED');
});

exports.animal_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED');
});

exports.animal_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED');
});

exports.animal_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED');
});