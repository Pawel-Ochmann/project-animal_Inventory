#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Animal = require('./models/animal');
const Category = require('./models/category');

const animals = [];
const categories = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createCategories();
  await createAnimals();

  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.

async function createAnimal(
  index,
  name,
  category,
  description,
  dateOfBirth,
  price,
  owned
) {
  const animalDetails = {
    name: name,
    category: category,
    description: description,
    date_of_birth: dateOfBirth,
    price: price,
    owned: owned || false,
  };

  const animal = new Animal(animalDetails); // Assuming 'Animal' is the model associated with AnimalSchema
  await animal.save();
  animals[index] = animal; // Assuming 'animals' is an array where you store your created animals
  console.log(`Added animal: ${name}`);
}

async function createCategory(index, name, description) {
  const categoryDetails = {
    name: name,
    description: description,
  };

  const category = new Category(categoryDetails); // Assuming 'Category' is the model associated with CategorySchema
  await category.save();
  categories[index] = category; // Assuming 'categories' is an array where you store your created categories
  console.log(`Added category: ${name}`);
}

async function createCategories() {
  console.log('Adding categories');
  await Promise.all([
    createCategory(
      0,
      'Dog',
      "Man's best friend. Dogs come in various breeds, sizes, and temperaments."
    ),
    createCategory(
      1,
      'Capybara',
      'The largest rodent in the world. Capybaras are known for their friendly nature and love for water.'
    ),
    createCategory(
      2,
      'Alpaca',
      'Domesticated South American camelids. Alpacas are prized for their soft and luxurious fleece.'
    ),
  ]);
}

// Assuming you have already defined the createCategory function and categories array

async function createAnimals() {
  console.log('Adding animals');
  await Promise.all([
    createAnimal(
      0,
      'Young Dog 1',
      categories[0]._id,
      'A playful and energetic young dog.',
      new Date('2022-01-01'),
      200,
      false
    ),
    createAnimal(
      1,
      'Young Dog 2',
      categories[0]._id,
      'Another cute young dog looking for a home.',
      new Date('2022-02-01'),
      250,
      false
    ),
    createAnimal(
      2,
      'Young Dog 3',
      categories[0]._id,
      'A friendly young dog with a loving personality.',
      new Date('2022-03-01'),
      300,
      false
    ),

    createAnimal(
      3,
      'Young Capybara 1',
      categories[1]._id,
      'A baby capybara enjoying its first adventures.',
      new Date('2022-04-01'),
      400,
      false
    ),
    createAnimal(
      4,
      'Young Capybara 2',
      categories[1]._id,
      'Capybara siblings looking for a cozy home.',
      new Date('2022-05-01'),
      450,
      false
    ),
    createAnimal(
      5,
      'Young Capybara 3',
      categories[1]._id,
      'Curious young capybara exploring its surroundings.',
      new Date('2022-06-01'),
      500,
      false
    ),

    createAnimal(
      6,
      'Young Alpaca 1',
      categories[2]._id,
      'A fluffy and adorable baby alpaca.',
      new Date('2022-07-01'),
      600,
      false
    ),
    createAnimal(
      7,
      'Young Alpaca 2',
      categories[2]._id,
      'Gentle young alpaca with a sweet temperament.',
      new Date('2022-08-01'),
      650,
      false
    ),
    createAnimal(
      8,
      'Young Alpaca 3',
      categories[2]._id,
      'Young alpaca with a luxurious fleece and friendly disposition.',
      new Date('2022-09-01'),
      700,
      false
    ),
  ]);
}

// Assuming you have already defined the createAnimal function and categories array
