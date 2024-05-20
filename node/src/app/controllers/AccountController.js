const Users = require('../models/users')
const lophocs = require('../models/lopHoc')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { multipleMongooseToObject } = require('../../until/mongoose');
class AcountController {
  showsigin(req, res) {
    res.render('welcome')
  }
  showsignup(req, res) {
    lophocs.find({})
      .then(lophocs => {
        res.render('signup/dk', {
          lophocs: multipleMongooseToObject(lophocs)
        })
      })

  }
  signup(req, res, next) {
    let findUser = Users.findOne({ username: req.query.username });
    let findEmail = Users.findOne({ email: req.query.email });
    Promise.all([findUser, findEmail])
      .then(([users, emails]) => {
        if (!emails || !users) {
          bcrypt.genSalt(10)
            .then(salt => {
              return bcrypt.hash(req.body.password, salt);
            })
            .then(hashed => {

              const newUser = new Users({
                username: req.body.username,
                tuoi: req.body.tuoi,
                gioiTinh: req.body.gioiTinh,
                noiSinh: req.body.noiSinh,
                password: hashed,
                email: req.body.email,
                diaChi: req.body.diaChi,
                img: req.body.img,
                role: req.body.role,
                hoTen: req.body.hoTen,
                lop: req.body.lop
              });
              return newUser.save();
            })
            .then(() => {
              res.redirect('/account/signup');
            })
            .catch(err => {
              res.status(500).json('Tạo k thành công do trùng username or password');
            });
        } else {
          res.json('Trùng dữ liệu');
          res.redirect('/account/signup');
        }
      })
      .catch(error => {
        res.status(500).json('Tạo k thành công');
      });
  }
  signin(req, res) {
    Users.findOne({ username: req.body.username })
      .then(data => {
        if (!data) {
          res.status(400).json('Tài khoản k đúng')

        }
        else {
          bcrypt.compare(req.body.password, data.password)
            .then(validPass => {
              if (!validPass) {
                res.status(400).json('Mật khẩu k đúng')
              }
              else {
                const token = jwt.sign({
                  _id: data._id

                },
                  process.env.MY_SERECT_KEY,
                  { expiresIn: '1d' }
                );
                res.status(200).json({ token: token });

              }
            })
            //.then(res.redirect('/'))


            .catch(error => {
              res.json({ code: 404, message: 'Login Failed' });
            });
        }
      })
      .catch(error => {

        res.json('Đăng nhập không thành công')
      })
  }


}

module.exports = new AcountController();