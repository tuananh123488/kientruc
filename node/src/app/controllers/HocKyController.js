const hockys = require('../models/hocKy');
const { multipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');

class HocKyController {
    show(req, res, next) {
        hockys.find({})
            .then(hockys => {
                res.render('hockys/info', {
                    hockys: multipleMongooseToObject(hockys)
                });
            })
            .catch(next);

    }
    create(req, res) {
        res.render('hockys/themhocky');
    }
    insert(req, res, next) {

        const { _id, tenHocKy } = req.body
        const hocky = new hockys({ _id, tenHocKy });
        hocky.save()
            .then(() => res.redirect('/hockys'))
            .catch(error => {
                res.json(error)
            });
    }
    edit(req, res, next) {
        hockys.findById(req.params.id)
            .then(hockys => res.render('hockys/edit', {
                hockys: mongooseToObject(hockys)
            })
            )
            .catch(next);

    }
    //[PUT] /hocviens/:id
    update(req, res, next) {
        const { tenHocKy } = req.body
        hockys.updateOne({ _id: req.params.id }, { tenHocKy })
            .then(() => res.redirect('/hockys'))
            .catch(next);

    }
    delete(req, res, next) {
        hockys.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
module.exports = new HocKyController();