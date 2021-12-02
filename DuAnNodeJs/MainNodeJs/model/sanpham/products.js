var mongoose = require('mongoose');

var schemaProduct = new mongoose.Schema({
    name: String,
    data: Number,
});

module.exports = mongoose.model("Product", schemaProduct)