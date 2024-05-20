const hocviens = require('../models/users');

const { multipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');

class HocVienController {
    show(req, res, next) {
        hocviens.find({ "role": true })
            .then(hocviens => {
                res.render('sinhviens/info', {
                    hocviens: multipleMongooseToObject(hocviens)
                });
            })
            .catch(next);

    }
    // create(req, res) {
    //     res.render('sinhviens/themhv');
    // }
    // insert(req, res, next) {

    //     const { _id, username, tuoi, gioiTinh, noiSinh, mssv, password, email, diaChi, img } = req.body
    //     const hocvien = new hocviens({ _id, username, tuoi, gioiTinh, noiSinh, mssv, password, email, diaChi, img });
    //     hocvien.save()
    //         .then(() => res.redirect('/hocviens'))
    //         .catch(error => {
    //             res.json(error)
    //         });
    // }
    // edit(req, res, next) {
    //     hocviens.findById(req.params.id)
    //         .then(hocviens => res.render('sinhviens/edit', {
    //             hocviens: mongooseToObject(hocviens)
    //         })
    //         )
    //         .catch(next);

    // }
    //[PUT] /hocviens/:id
    // update(req, res, next) {
    //     const { _id, username, tuoi, gioiTinh, noiSinh, mssv, password, email, diaChi, img } = req.body
    //     hocviens.updateOne({ _id: req.params.id }, { _id, username, tuoi, gioiTinh, noiSinh, mssv, password, email, diaChi, img })
    //         .then(() => res.redirect('/hocviens'))
    //         .catch(next);

    // }
    delete(req, res, next) {
        hocviens.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
module.exports = new HocVienController();