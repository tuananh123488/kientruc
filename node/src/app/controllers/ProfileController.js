const Users = require('../models/users')
const dkhps = require('../models/dangKiHocPhan')
const lophocs = require('../models/lopHoc')
const { multipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongoose').Types.ObjectId;
class ProfileController {
    show(req, res) {
        Users.findById(req._id)
            .then(users => {
                res.render('users/general', {
                    users: mongooseToObject(users)
                })

            })
            .catch(error => {
                res.json({ code: 404, message: 'Bạn không có trong danh sách người dùng' })
            })


    }
    editGeneral(req, res, next) {
        let validEmail = Users.findOne({ email: req.query.email })
        let updateEmail = Users.updateOne({ _id: req._id }, { email: req.body.email })
        Promise.all([validEmail, updateEmail])
            .then(([valid, update]) => {
                if (!valid) {
                    res.json({ code: 200, message: 'success' })
                }
                else {
                    res.json({ code: 501, message: 'fail' })
                }

            })
            .catch(err => {
                res.json({ code: 500, message: 'fail' })
            })
    }
    // showThongTinSinhVien(req, res) {
    //     Promise.all([
    //         Users.findById(req._id),
    //         dkhps.find({ 'sinhVien._id': new ObjectId(req._id) })
    //     ])

    //         .then(([users, dkhps, lophocs]) => {
    //             lophocs.findById(users.lop)
    //             res.render('users/thongtinsinhvien', {
    //                 lophocs: mongooseToObject(lophocs),
    //                 users: mongooseToObject(users),
    //                 dkhps: multipleMongooseToObject(dkhps)
    //             })

    //         })
    //         .catch(error => {
    //             res.json({ code: 404, message: 'Bạn không có trong danh sách người dùng', error })
    //         })

    // }
    showThongTinSinhVien(req, res) {
        Promise.all([
            Users.findById(req._id),
            dkhps.find({ 'sinhVien._id': new ObjectId(req._id) })
        ])
            .then(([user, dkhps]) => {
                // Trả về một Promise mới để bao gồm lophocs.findById
                return lophocs.findById(user.lop).then(lophoc => ({
                    user,
                    dkhps,
                    lophoc
                }));
            })
            .then(({ user, dkhps, lophoc }) => {
                res.render('users/thongtinsinhvien', {
                    lophocs: mongooseToObject(lophoc),
                    users: mongooseToObject(user),
                    dkhps: multipleMongooseToObject(dkhps)
                });
            })
            .catch(error => {
                res.status(404).json({
                    code: 404,
                    message: 'Bạn không có trong danh sách người dùng',
                    error
                });
            });
    }
    showLichHoc(req, res) {
        Promise.all([

            dkhps.find({ 'sinhVien._id': new ObjectId(req._id) })
        ])

            .then(([dkhps]) => {

                res.render('users/lichHoc', {

                    dkhps: multipleMongooseToObject(dkhps)
                })

            })
            .catch(error => {
                res.json({ code: 404, message: 'Bạn không có trong danh sách người dùng', error })
            })

    }
    showEditProfile(req, res) {
        Users.findById(req._id)
            .then(users => {
                res.render('users/editprofile', {
                    users: mongooseToObject(users)
                })

            })
            .catch(error => {
                res.json({ code: 404, message: 'Bạn không có trong danh sách người dùng' })
            })

    }
    editProfile(req, res, next) {
        Users.updateOne({ _id: req._id }, { name: req.body.name, location: req.body.location, dateOfBirth: req.body.dateOfBirth, bio: req.body.bio })
            .then(res.redirect('/profiles/editprofile'))
            .catch(next)
    }
    editAvatar(req, res, next) {

        Users.updateOne({ _id: req._id }, { img: req.file.path })
            .then(res.redirect('/profiles/editprofile'))
            .catch(error => {
                res.json({ code: 500, message: 'fail' })
            })
    }
    deleteAvatar(req, res, next) {
        Users.updateOne({ _id: req._id }, { img: '' })
            .then(res.redirect('/profiles/editprofile'))
            .catch(next)
    }
    showPassword(req, res) {
        Users.findById(req._id)
            .then(users => {
                res.render('users/password', {
                    users: mongooseToObject(users)
                })

            })
            .catch(error => {
                res.json({ code: 404, message: 'Bạn không có trong danh sách người dùng' })
            })

    }
    updatePassword(req, res) {
        Users.findById(req._id)
            .then(async user => {
                const validPassword = await bcrypt.compare(req.body.oldPassword, user.password)
                if (!validPassword) {
                    res.json({ code: 401, message: 'fail' })
                }
                else {
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hashed = await bcrypt.hash(req.body.newPassword, salt)
                        await Users.updateOne({ _id: req._id }, { password: hashed })
                        res.json({ code: 200, message: 'success' })
                    } catch (error) {
                        res.json({ code: 500, message: 'fail' })
                    }
                }


            })
            .catch(error => {
                console.log(error);
            })
    }
    deleteUser(req, res) {
        Users.deleteOne({ _id: req._id })
            .then(res.json({ code: 200, message: 'success' }))
            .catch(res.json({ code: 500, message: 'fail' }))
    }

}
module.exports = new ProfileController();