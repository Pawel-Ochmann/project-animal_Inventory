const Animal = require('../models/animal');
const Category = require('../models/category');
const { body, validationResult } = require('express-validator');

const asyncHandler = require('express-async-handler');

exports.animal_list = asyncHandler(async (req, res, next) => {
  const animals = await Animal.find().populate('category');
  res.render('animal_list', { title: 'Animals list', animals });
});

exports.animal_detail_get = asyncHandler(async (req, res, next) => {
  const animal = await Animal.findById(req.params.id);

  res.render('animal_detail', { animal });
});

exports.animal_detail_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED');
});

exports.animal_create_get = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}, 'name');
  res.render('animal_create', { title: 'Add new animal', categories });
});

exports.animal_create_post = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('You have to set a name for a new animal'),
  body('category')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Category is required'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Description is required'),
  body('date_of_birth').isISO8601().toDate().withMessage('Invalid date format'),
  body('price').isNumeric().withMessage('Price must be a number'),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Handle validation errors
      // You may want to customize this based on your needs
      res.render('animal_create', {
        title: 'Create an animal',
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        date_of_birth: req.body.date_of_birth,
        price: req.body.price,
        errors: errors.array(),
      });
      return;
    }

    // Data from form is valid.
    const categorySelected = await Category.findOne({ _id: req.body.category });
    console.log(req.body.category, categorySelected);

    const newAnimal = new Animal({
      name: req.body.name,
      category: categorySelected._id,
      description: req.body.description,
      date_of_birth: req.body.date_of_birth,
      price: req.body.price,
    });

    // Save animal.
    await newAnimal.save();

    // Redirect to the new animal record.
    res.redirect(`/animals/${newAnimal._id}`);
  }),
];

exports.animal_update_get = asyncHandler(async(req, res, next) => {
    const categories = await Category.find({}, 'name');
    const animal = await Animal.findById(req.params.id).populate("category")
    console.log(animal);

    res.render('animal_form', { animal , categories });
})

exports.animal_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED');
});

exports.animal_delete_post = asyncHandler(async (req, res, next) => {
  await Animal.findByIdAndDelete(req.params.id);

  res.redirect('/animals');
});
