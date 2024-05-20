const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const khoa = new Schema({
    _id: { type: Number },
    tenKhoa: { type: String }

}, {
    timestamps: true,
});
module.exports = mongoose.model('Khoas', khoa);