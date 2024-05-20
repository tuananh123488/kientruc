const giaoviens = require('../models/teachers');
const { multipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');

class GiaoVienController {
    show(req, res, next) {
        giaoviens.find({})
            .then(giaoviens => {
                res.render('giaoviens/info', {
                    giaoviens: multipleMongooseToObject(giaoviens)
                });
            })
            .catch(next);

    }
    create(req, res) {
        res.render('giaoviens/themgiaovien');
    }
    insert(req, res, next) {

        const { _id, username, tuoi, gioiTinh, noiSinh, email, diaChi, img } = req.body
        const giaovien = new giaoviens({ _id, username, tuoi, gioiTinh, noiSinh, email, diaChi, img });
        giaovien.save()
            .then(() => res.redirect('/giaoviens'))
            .catch(error => {
                res.json(error)
            });
    }
    edit(req, res, next) {
        giaoviens.findById(req.params.id)
            .then(giaoviens => res.render('giaoviens/edit', {
                giaoviens: mongooseToObject(giaoviens)
            })
            )
            .catch(next);


    }
    //[PUT] /hocviens/:id
    update(req, res, next) {
        const { username, tuoi, gioiTinh, noiSinh, email, diaChi, img } = req.body
        giaoviens.updateOne({ _id: req.params.id }, { username, tuoi, gioiTinh, noiSinh, email, diaChi, img })
            .then(() => res.redirect('/giaoviens'))
            .catch(next);

    }
    delete(req, res, next) {
        giaoviens.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
module.exports = new GiaoVienController();