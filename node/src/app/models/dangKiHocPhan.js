const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;

mongoose.plugin(slug);
const dangKyHocPhanSchema = new mongoose.Schema({
    hocPhan: {
        type: Object,
    },
    sinhVien: {
        type: Object,

    },
    ngayDangKy: {
        type: Date,
        default: Date.now
    },

});


module.exports = mongoose.model('DangKyHocPhans', dangKyHocPhanSchema);
