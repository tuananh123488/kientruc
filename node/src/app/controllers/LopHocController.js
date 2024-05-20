const lophocs = require('../models/lopHoc');
const chuyenNganhs = require('../models/chuyennganhs');
const { multipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');

class LopHocController {
    show(req, res, next) {
        lophocs.find({})
            .then(lophocs => {
                res.render('lophocs/info', {
                    lophocs: multipleMongooseToObject(lophocs)
                });
            })
            .catch(next);

    }
    create(req, res, next) {
        chuyenNganhs.find({})
            .then(chuyenNganhs => {
                res.render('lophocs/themlophoc', {
                    chuyenNganhs: multipleMongooseToObject(chuyenNganhs)
                });
            })
            .catch(next);


    }

    insert(req, res, next) {

        const { _id, tenLopHoc, siSo, chuyenNganhob } = req.body;


        chuyenNganhs.findOne({ _id: chuyenNganhob })
            .then(ob => {
                if (!ob) {
                    throw new Error('Không tìm thấy chuyenNganh');
                }
                const lophoc = new lophocs({ _id, tenLopHoc, siSo, chuyenNganh: ob });
                return lophoc.save();
            })
            .then(() => res.redirect('/lophocs'))
            .catch(error => {
                res.json(error);
            });
    }

    edit(req, res, next) {
        // lophocs.findById(req.params.id)
        //     .then(lophocs => res.render('lophocs/edit', {
        //         lophocs: mongooseToObject(lophocs)
        //     })
        //     )
        //     .catch(next);

        Promise.all([
            lophocs.findById(req.params.id),
            chuyenNganhs.find({})
        ])
            .then(([lophocs, chuyenNganhs]) => {
                res.render('lophocs/edit', {
                    lophocs: mongooseToObject(lophocs),
                    chuyenNganhs: multipleMongooseToObject(chuyenNganhs)
                });
            })
            .catch(next);
    }
    //[PUT] /chuyennganhs/:id
    update(req, res, next) {
        const { tenLopHoc, siSo, chuyennganhId } = req.body
        // lophocs.updateOne({ _id: req.params.id }, { tenLopHoc, siSo, chuyennganhId })
        //     .then(() => res.redirect('/lophocs'))
        //     .catch(next);
        chuyenNganhs.findOne({ _id: chuyennganhId })
            .then(ob => {
                if (!ob) {
                    throw new Error('Không tìm thấy chuyên ngành');
                }

                return lophocs.updateOne({ _id: req.params.id }, { tenLopHoc, siSo, chuyenNganh: ob })

            })
            .then(() => res.redirect('/lophocs'))
            .catch(error => {
                res.json(error);
            });

    }
    delete(req, res, next) {
        lophocs.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
module.exports = new LopHocController();