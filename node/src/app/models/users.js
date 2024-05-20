const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const users = new Schema({


    username: { type: String },
    tuoi: { type: String },
    gioiTinh: { type: String },
    noiSinh: { type: String },

    password: { type: String },
    email: { type: String },
    diaChi: { type: String },
    img: { type: String },
    role: {
        type: Boolean,
        require: true,
        default: true
    },

    hoTen: { type: String },
    lop: { type: String }
})

module.exports = mongoose.model('Users', users)