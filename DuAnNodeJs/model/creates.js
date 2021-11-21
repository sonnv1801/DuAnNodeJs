var mongoose = require('mongoose');

var schemaCreate = new mongoose.Schema({
    Name: String,
    Image: String,
    Age: Number,
});

module.exports = mongoose.model("Create", schemaCreate )