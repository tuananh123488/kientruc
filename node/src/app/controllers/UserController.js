const sales = require('../models/sales');
const users = require('../models/users')
const { multipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');
const { error } = require('jquery');

class UserController {
  index(req, res, next) {
    //[Get] /users
    //res.render('home');
    sales.find({})
      .then(sale => //res.json()
      {
        res.render('home', {
          sales: multipleMongooseToObject(sale)
        });
      })
      .catch(error => {
        res.json('Lỗi render')
      });
  }

  show(req, res, next) {
    //[Get] /users/:slug
    sales.findOne({ _id: req.params._id }) // tự update slug mới
      .then(sales => {

        res.render('courses/show', {
          sales: mongooseToObject(sales)
        })
      })
      .catch(error => {
        res.json('ERROR')
      });
  }
  study(req, res) {
    let person = users.findById(req._id)
    let courses = sales.findOne({ _id: req.params._id })
    Promise.all([person, courses])
      .then(([user, courses]) => {
        var tenCourse = courses.item
        var uc = user.course
        const courseExists = uc.some(coursess => coursess.tenKH === tenCourse);

        if (courseExists === true) {
          res.json({ code: 502 })
        }
        else {
          res.json({ code: 200, courseExists })
        }
      })
      .catch(error => {
        res.json({ code: 501 })
      })
  }

}
module.exports = new UserController();
