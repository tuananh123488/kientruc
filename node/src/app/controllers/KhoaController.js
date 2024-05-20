const khoas = require('../models/khoa');
const { multipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');

class KhoaController {
    show(req, res, next) {
        khoas.find({})
            .then(khoas => {
                res.render('khoas/info', {
                    khoas: multipleMongooseToObject(khoas)
                });
            })
            .catch(next);

    }
    create(req, res) {
        res.render('khoas/themkhoa');
    }
    insert(req, res, next) {

        const { _id, tenKhoa } = req.body
        const khoa = new khoas({ _id, tenKhoa });
        khoa.save()
            .then(() => res.redirect('/khoas'))
            .catch(error => {
                res.json(error)
            });
    }
    edit(req, res, next) {
        khoas.findById(req.params.id)
            .then(khoas => res.render('khoas/edit', {
                khoas: mongooseToObject(khoas)
            })
            )
            .catch(next);

    }
    //[PUT] /hocviens/:id
    update(req, res, next) {
        const { tenKhoa } = req.body
        khoas.updateOne({ _id: req.params.id }, { tenKhoa })
            .then(() => res.redirect('/khoas'))
            .catch(next);

    }
    delete(req, res, next) {
        khoas.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
module.exports = new KhoaController();