const chuyennganhs = require('../models/chuyennganhs');
const khoas = require('../models/khoa');
const { multipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');

class ChuyenNganhController {
    show(req, res, next) {
        chuyennganhs.find({})
            .then(chuyennganhs => {
                res.render('chuyennganhs/info', {
                    chuyennganhs: multipleMongooseToObject(chuyennganhs)
                });
            })
            .catch(next);

    }
    create(req, res, next) {
        khoas.find({})
            .then(khoas => {
                res.render('chuyennganhs/themchuyennganh', {
                    khoas: multipleMongooseToObject(khoas)
                });
            })
            .catch(next);

    }
    // insert(req, res, next) {

    //     const { _id, tenNganh, khoaId } = req.body;
    //     const khoa = khoas.findOne({ _id: khoaId });
    //     const chuyenNganh = new chuyennganhs({ _id, tenNganh, khoa });
    //     chuyenNganh.save()
    //         .then(() => res.redirect('/chuyennganhs'))
    //         .catch(error => {
    //             res.json(error)
    //         });
    // }
    insert(req, res, next) {
        const { _id, tenNganh, khoaId } = req.body;


        khoas.findOne({ _id: khoaId })
            .then(ob => {
                if (!ob) {
                    throw new Error('Không tìm thấy khoa');
                }

                const chuyenNganh = new chuyennganhs({ _id, tenNganh, khoa: ob });
                return chuyenNganh.save();
            })
            .then(() => res.redirect('/chuyennganhs'))
            .catch(error => {
                res.json(error);
            });
    }

    edit(req, res, next) {
        Promise.all([
            chuyennganhs.findById(req.params.id),
            khoas.find({})
        ])
            .then(([chuyennganhs, khoas]) => {
                res.render('chuyennganhs/edit', {
                    chuyennganhs: mongooseToObject(chuyennganhs),
                    khoas: multipleMongooseToObject(khoas)
                });
            })
            .catch(next);
    }
    //[PUT] /chuyennganhs/:id
    update(req, res, next) {
        const { tenNganh, khoaId } = req.body
        khoas.findOne({ _id: khoaId })
            .then(ob => {
                if (!ob) {
                    throw new Error('Không tìm thấy khoa');
                }

                return chuyennganhs.updateOne({ _id: req.params.id }, { tenNganh, khoa: ob })

            })
            .then(() => res.redirect('/chuyennganhs'))
            .catch(error => {
                res.json(error);
            });


    }
    delete(req, res, next) {
        chuyennganhs.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
module.exports = new ChuyenNganhController();