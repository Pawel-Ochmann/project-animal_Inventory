const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const AnimalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  owned: {
    type: Boolean,
    required: true,
    default: false,
  },
});

AnimalSchema.virtual('url').get(function () {
  return `/animals/${this._id}`;
});

AnimalSchema.virtual('date_of_birth_formatted').get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toISODate();
});

module.exports = mongoose.model('Animal', AnimalSchema);
