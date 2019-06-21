const mongoose = require("mongoose");

const dictionarySchema = new mongoose.Schema({
  fa: String,
  en: String,
});

module.exports = {
  schema: dictionarySchema,
  model: mongoose.model("dictionary", dictionarySchema)
};
