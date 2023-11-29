const Animal = require('../models/animal');
const Category = require('../models/category');

const asyncHandler = require('express-async-handler');

exports.category_list = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  res.render('category_list', { title: 'Categories list', categories });
});

exports.category_detail_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findOne({ name: req.params.name });
  const allAnimals = await Animal.find({ category: category._id }, 'name url');

  console.log(req.params.name)

  res.render('category_details', {
    title: category.name,
    category: category,
    animals: allAnimals,
  });
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
