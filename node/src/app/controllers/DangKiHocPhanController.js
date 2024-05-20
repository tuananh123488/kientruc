const hocphans = require('../models/hocphan');
const users = require('../models/users');
const dkhps = require('../models/dangKiHocPhan')
const hockys = require('../models/hocKy')
const { multipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
class DangKiHocPhanController {
    // show(req, res, next) {
    //     hocphans.find({})
    //         .then(hocphans => {

    //             res.render('dkhps/info', {
    //                 hocphans: multipleMongooseToObject(hocphans)
    //             });
    //         })
    //         .catch(next);

    // }
    show(req, res, next) {


        users.findById(req._id)
            .then(user => {
                return dkhps.find({ "sinhVien._id": user._id });
            })
            .then(dkhps => {

                const tenMH = dkhps.map(dkhp => dkhp.hocPhan.monHoc.tenMonHoc);
                return hocphans.find({ "monHoc.tenMonHoc": { $nin: tenMH } });
            })

            // .then(hocphansWithoutDkhps => {
            //     res.render('dkhps/info', {
            //         hocphans: multipleMongooseToObject(hocphansWithoutDkhps)
            //     });
            // })
            .then(hocphansWithoutDkhps => {

                const uniqueHocphansMap = new Map();
                hocphansWithoutDkhps.forEach(hocphan => {
                    const tenMonHoc = hocphan.monHoc.tenMonHoc;
                    if (!uniqueHocphansMap.has(tenMonHoc)) {
                        uniqueHocphansMap.set(tenMonHoc, hocphan);
                    }
                });


                const uniqueHocphans = Array.from(uniqueHocphansMap.values());

                res.render('dkhps/info', {
                    hocphans: multipleMongooseToObject(uniqueHocphans)
                });
            })
            .catch(next);
    }

    showDanhSachMonHoc(req, res, next) {

        Promise.all([hocphans.find({ "monHoc.tenMonHoc": req.params.id }),
        hockys.find({})
        ])
            .then(([hocphansWithoutDkhps, hockys]) => {
                res.render('dkhps/danhsachmh', {
                    hocphans: multipleMongooseToObject(hocphansWithoutDkhps),
                    hockys: multipleMongooseToObject(hockys)
                });
            })

            .catch(next);
    }
    create(req, res, next) {

        dkhps.find({ 'sinhVien._id': new ObjectId(req._id) })


            .then(dkhps => {
                res.render('dkhps/xemHocPhan', {
                    dkhps: multipleMongooseToObject(dkhps)
                });
            })
            .catch(next);

    }




    // edit(req, res, next) {
    //     Promise.all([
    //         users.findById(req._id),
    //         hocphans.findById(req.params.id),
    //     ])
    //         .then(([users, hocphans]) => {

    //             const dkhp = new dkhps({ hocPhan: hocphans, sinhVien: users });
    //             return dkhp.save();
    //         })
    //         .then(() => {
    //             res.send('<script>alert("Đăng kí học phần thành công !"); window.location="/dkhps";</script>');
    //         })
    //         .catch(next);
    // }
    edit(req, res, next) {
        Promise.all([
            dkhps.find({ "sinhVien._id": new ObjectId(req._id) }),
            users.findById(req._id),
            hocphans.findById(req.params.id),
        ])
            .then(([existingDkhps, user, hocphan]) => {
                console.log(existingDkhps)

                const newDkhpDate = hocphan.lyThuyet;
                const isDuplicate = existingDkhps.some(dkhp => dkhp.hocPhan.lyThuyet === newDkhpDate);
                const isDuplicateTH = existingDkhps.some(dkhp => dkhp.hocPhan.thucHanh === newDkhpDate);

                const newDkhpDateTwo = hocphan.thucHanh;
                const isDuplicateTwo = existingDkhps.some(dkhp => dkhp.hocPhan.thucHanh === newDkhpDateTwo);
                const isDuplicateTwoTH = existingDkhps.some(dkhp => dkhp.hocPhan.lyThuyet === newDkhpDateTwo);
                if (isDuplicate || isDuplicateTH) {
                    res.send(`
                    <script>
                        alert("Trùng tiết lý thuyết: ${newDkhpDate}!");
                        window.location="/dkhps";
                    </script>
                `);
                    return Promise.reject('Duplicate registration date');
                }
                if (isDuplicateTwo || isDuplicateTwoTH) {
                    res.send(`
                    <script>
                        alert("Trùng tiết thực hành: ${newDkhpDateTwo}!");
                        window.location="/dkhps";
                    </script>
                `);
                    return Promise.reject('Duplicate registration date');
                }

                // Nếu không trùng, tiếp tục lưu dkhp mới
                const newDkhp = new dkhps({ hocPhan: hocphan, sinhVien: user });
                return newDkhp.save();
            })
            .then(() => {
                res.send('<script>alert("Đăng kí học phần thành công !"); window.location="/dkhps";</script>');
            })
            .catch(err => {
                if (err !== 'Duplicate registration date') {
                    next(err);
                }
            });
    }

    delete(req, res, next) {
        dkhps.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
module.exports = new DangKiHocPhanController();