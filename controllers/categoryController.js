const Animal = require('../models/animal');
const Category = require('../models/category');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.category_list = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  res.render('category_list', { title: 'Categories list', categories });
});

exports.category_detail_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findOne({ name: req.params.name });
  const allAnimals = await Animal.find({ category: category._id }, 'name url');

  res.render('category_details', {
    title: category.name,
    category: category,
    animals: allAnimals,
  });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render('category_create', { title: 'Create a category', errors:[] });
});

exports.category_create_post = [
  body('name').trim().isLength({min:1}).escape().withMessage('You have to set a name for a new category'),
  body('description').trim().isLength({min:1}).escape().withMessage('Description is required'),
  asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  const newCategory = new Category({
    name:req.body.name,
    description:req.body.description
  })

      if (!errors.isEmpty()) {
        res.render('category_create', {
          title: 'Create a category',
          errors: errors.array(),
        });
        return;
      } else {
        // Data from form is valid.

        // Save author.
        await newCategory.save();
        // Redirect to new author record.
        res.redirect(newCategory.url);
      }

})];

exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED');
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED');
});
