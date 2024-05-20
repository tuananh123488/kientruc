const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const hocKy = new Schema({
    _id: { type: Number },
    tenHocKy: { type: String }

});
module.exports = mongoose.model('hocKys', hocKy);