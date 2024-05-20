const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const hocphan = new Schema({
    _id: { type: Number },
    lopHoc: { type: Object },
    monHoc: { type: Object },
    giaoVien: { type: Object },
    lyThuyet: { type: String },
    thucHanh: { type: String },
    phongHoc: { type: String },
    hocKy: { type: Object }
});
module.exports = mongoose.model('HocPhans', hocphan);
