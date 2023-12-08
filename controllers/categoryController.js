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
    error: null,
  });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render('category_create', {
    title: 'Create a category',
    name: '',
    description: '',
    button: 'Create',
    errors: [],
  });
});

exports.category_create_post = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('You have to set a name for a new category'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Description is required'),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const newCategory = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render('category_create', {
        title: 'Create a category',
        name: '',
        description: '',
        button: 'Create',
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
  }),
];

exports.category_update_get = asyncHandler(async (req, res, next) => {
  const updatedCategory = await Category.findOne({ name: req.params.name });
  res.render('category_create', {
    title: 'Update a category',
    name: updatedCategory.name,
    description: updatedCategory.description,
    button: 'Update',
    errors: [],
  });
});

exports.category_update_post = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('You have to set a name for a new category'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Description is required'),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('category_create', {
        title: 'Create a category',
        name: '',
        description: '',
        button: 'Create',
        errors: errors.array(),
      });
      return;
    } else {
      const newCategory = await Category.findOneAndUpdate(
        { name: req.params.name },
        {
          name: req.body.name,
          description: req.body.description,
        },
        { new: true } // This option returns the updated document
      );

      // Redirect to new author record.
      res.redirect(newCategory.url);
    }
  }),
];

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const category  = await  Category.findOne({ name: req.params.name })
  const categoryAnimals = await Animal.find({ category:  category._id})

  console.log(categoryAnimals)

  if (categoryAnimals.length > 0) {
    res.render('category_details', {
      title: category.name,
      category: category,
      animals: categoryAnimals,
      error: 'You cannot delete a category that has animals assigned to it.',
    });
  } else { await Category.findOneAndDelete({ name: req.params.name });
  res.redirect('/categories'); }
});
