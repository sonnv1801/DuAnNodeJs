var mongoose = require('mongoose');

var detaisSchema = new mongoose.Schema({
    MaDT: String,
    TenDT: String,
    KinhPhi: Number,
    NoiThucTap: String
});

module.exports = mongoose.model("DeTai", detaisSchema)