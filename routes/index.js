var express = require('express');
var router = express.Router();

const category_controller = require('../controllers/categoryController');
const animal_controller = require('../controllers/animalController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
