var express = require('express');
var router = express.Router();

const category_controller = require('../controllers/categoryController');
const animal_controller = require('../controllers/animalController');

/* GET home page. */

// Category routes
router.get('/categories/create', category_controller.category_create_get);
router.post('/categories/create', category_controller.category_create_post);
router.get('/categories/:name', category_controller.category_detail_get);

router.post(
  '/categories/:name/update',
  category_controller.category_update_post
);
router.post(
  '/categories/:name/delete',
  category_controller.category_delete_post
);

router.get('/categories', category_controller.category_list);

//Animals routes

router.get('/animals', animal_controller.animal_list);
router.get('/animals/:id', animal_controller.animal_detail_get);
router.post('/animals/:id', animal_controller.animal_detail_post);
router.get('/animals/create', animal_controller.animal_create_get);
router.post('/animals/create', animal_controller.animal_create_post);
router.post('/animals/:id/update', animal_controller.animal_update_post);
router.post('/animal/:id/delete', animal_controller.animal_delete_post);

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Animal shop' });
});


module.exports = router;
