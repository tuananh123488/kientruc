const monhocs = require('../models/monHoc');
const { multipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');

class MonHocController {
    show(req, res, next) {
        monhocs.find({})
            .then(monhocs => {
                res.render('monhocs/info', {
                    monhocs: multipleMongooseToObject(monhocs)
                });
            })
            .catch(next);

    }
    create(req, res) {
        res.render('monhocs/themmonhoc');
    }
    insert(req, res, next) {

        const { _id, tenMonHoc, tinChi, tietLyThuyet, tietThucHanh } = req.body
        const monhoc = new monhocs({ _id, tenMonHoc, tinChi, tietLyThuyet, tietThucHanh });
        monhoc.save()
            .then(() => res.redirect('/monhocs'))
            .catch(error => {
                res.json(error)
            });
    }
    edit(req, res, next) {
        monhocs.findById(req.params.id)
            .then(monhocs => res.render('monhocs/edit', {
                monhocs: mongooseToObject(monhocs)
            })
            )
            .catch(next);

    }
    id
    update(req, res, next) {
        const { tenMonHoc, tinChi, tietLyThuyet, tietThucHanh } = req.body
        monhocs.updateOne({ _id: req.params.id }, { tenMonHoc, tinChi, tietLyThuyet, tietThucHanh })
            .then(() => res.redirect('/monhocs'))
            .catch(next);

    }
    delete(req, res, next) {
        monhocs.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
module.exports = new MonHocController();