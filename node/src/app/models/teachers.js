const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;

const teacher = new Schema({
    _id: { type: Number },
    username: { type: String },
    tuoi: { type: String },
    gioiTinh: { type: String },
    noiSinh: { type: String },
    email: { type: String },
    diaChi: { type: String },
    img: { type: String },

}, {
    timestamps: true,
});
module.exports = mongoose.model('Teachers', teacher);
