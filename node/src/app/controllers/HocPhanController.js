const hocphans = require('../models/hocphan');
const lophocs = require('../models/lopHoc');
const giaoviens = require('../models/teachers');
const monhocs = require('../models/monHoc');
const users = require('../models/users');
const dkhps = require('../models/dangKiHocPhan')
const hockys = require('../models/hocKy')
const { multipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');

class HocPhanController {
    show(req, res, next) {
        hocphans.find({})
            .then(hocphans => {
                res.render('hocphans/info', {
                    hocphans: multipleMongooseToObject(hocphans)
                });
            })
            .catch(next);

    }
    showDanhSachSV(req, res, next) {
        // hocphans.findById(req.params.id)
        //     .then(hocphans => {

        //         return dkhps.find({ "hocPhan._id": hocphans._id })

        //     }).then(dkhps => {

        //         res.render('hocphans/showSvDk', {

        //             dkhps: multipleMongooseToObject(dkhps)
        //         });
        //     })

        //     .catch(next);
        hocphans.findById(req.params.id)
            .then(hocphans => {
                return dkhps.find({ "hocPhan._id": hocphans._id })
                    .then(dkhps => {
                        res.render('hocphans/showSvDk', {
                            hocphans: mongooseToObject(hocphans), // Truyền đối tượng hocphans vào res.render
                            dkhps: multipleMongooseToObject(dkhps)
                        });
                    });
            })
            .catch(next);
    }


    create(req, res, next) {
        Promise.all([
            lophocs.find({}),
            monhocs.find({}),
            giaoviens.find({}),
            hockys.find({})
        ])

            .then(([lophocs, monhocs, giaoviens, hockys]) => {
                res.render('hocphans/themhocphan', {
                    lophocs: multipleMongooseToObject(lophocs),
                    monhocs: multipleMongooseToObject(monhocs),
                    giaoviens: multipleMongooseToObject(giaoviens),
                    hockys: multipleMongooseToObject(hockys)
                });
            })
            .catch(next);

    }
    insert(req, res, next) {
        const { _id, lopHocId, monHocId, giaoVienId, lyThuyet, thucHanh, phongHoc, hocKyId } = req.body;

        Promise.all([
            lophocs.findById(lopHocId),
            monhocs.findById(monHocId),
            giaoviens.findById(giaoVienId),
            hockys.findById(hocKyId)
        ])
            .then(([lopHoc, monHoc, giaoVien, hocky]) => {
                console.log(hocky);
                if (!lopHoc) {
                    throw new Error('Không tìm thấy lớp học');
                }
                if (!monHoc) {
                    throw new Error('Không tìm thấy môn học');
                }
                if (!giaoVien) {
                    throw new Error('Không tìm thấy giáo viên');
                }
                if (!hocky) {
                    throw new Error('Không tìm thấy học kì');
                }

                const hocPhan = new hocphans({ _id, lopHoc, monHoc, giaoVien, lyThuyet, thucHanh, phongHoc, hocKy: hocky });
                return hocPhan.save();
            })
            .then(() => {
                res.redirect('/hocphans');
            })
            .catch(error => {
                res.status(400).json({ error: error.message });
            });
    }



    edit(req, res, next) {
        Promise.all([
            hocphans.findById(req.params.id),
            lophocs.find({}),
            monhocs.find({}),
            giaoviens.find({}),
            hockys.find({})
        ])
            .then(([hocphans, lophocs, monhocs, giaoviens, hockys]) => {

                res.render('hocphans/edit', {
                    hocphans: mongooseToObject(hocphans),
                    lophocs: multipleMongooseToObject(lophocs),
                    monhocs: multipleMongooseToObject(monhocs),
                    giaoviens: multipleMongooseToObject(giaoviens),
                    hockys: multipleMongooseToObject(hockys)
                });

            })
            .catch(next);
    }
    //[PUT] /chuyennganhs/:id
    update(req, res, next) {
        const { lopHocId, monHocId, giaoVienId, lyThuyet, thucHanh, phongHoc, hocKyId } = req.body;
        Promise.all([
            lophocs.findOne({ _id: lopHocId }),
            monhocs.findOne({ _id: monHocId }),
            giaoviens.findOne({ _id: giaoVienId }),
            hockys.findOne({ _id: hocKyId }),
        ])
            .then(([lophocs, monhocs, giaoviens, hockys]) => {

                if (!lophocs) {
                    throw new Error('Không tìm thấy lớp học');
                }
                if (!monhocs) {
                    throw new Error('Không tìm thấy môn học');
                }
                if (!giaoviens) {
                    throw new Error('Không tìm thấy giáo viên');
                }
                if (!hockys) {
                    throw new Error('Không tìm thấy học kỳ');
                }

                return hocphans.updateOne({ _id: req.params.id }, { lopHoc: lophocs, monHoc: monhocs, giaoVien: giaoviens, lyThuyet, thucHanh, phongHoc, hocKy: hockys })

            })
            .then(() => res.redirect('/hocphans'))
            .catch(error => {
                res.json(error);
            });


    }
    delete(req, res, next) {
        hocphans.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
module.exports = new HocPhanController();