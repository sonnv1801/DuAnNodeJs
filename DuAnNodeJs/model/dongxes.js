var mongoose = require('mongoose');

var dongxesSchema = new mongoose.Schema({
    DongXe: String,
    HangXe: String,
    SoChoNgoi: String,
});

module.exports = mongoose.model("DongXe", dongxesSchema)