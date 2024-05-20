const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const monHoc = new Schema({
    _id: { type: Number },
    tenMonHoc: { type: String },
    tinChi: { type: Number },
    tietLyThuyet: { type: Number },
    tietThucHanh: { type: Number }


}, {
    timestamps: true,
});
module.exports = mongoose.model('MonHocs', monHoc);