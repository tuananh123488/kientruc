const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const lopHoc = new Schema({
    _id: { type: Number },
    tenLopHoc: { type: String },
    siSo: { type: Number },
    chuyenNganh: { type: Object }
}, {
    timestamps: true,
});
module.exports = mongoose.model('LopHocs', lopHoc);
