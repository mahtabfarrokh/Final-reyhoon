const mongoose = require("mongoose");
const food = require("./food.js");
const comment = require("./comment.js");
const category = require("./category.js");
const address = require("./address.js");

const restaurantSchema = new mongoose.Schema({
  id: String,
  name: String,
  logo: String,
  openingTime: Number,
  closingTime: Number,
  averageRate: Number, 
  address: address.schema,
  categories: [category.schema],
  foods: [food.schema],
  comments: [comment.schema]
});

module.exports = {
  schema: restaurantSchema,
  model: mongoose.model("restaurant", restaurantSchema)
};
