const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
const khoa = require('./khoa')
mongoose.plugin(slug);

const chuyennganh = new Schema({
    _id: { type: Number },
    tenNganh: { type: String },
    khoa: { type: Object }
}, {
    timestamps: true,
});
module.exports = mongoose.model('ChuyenNganhs', chuyennganh);
