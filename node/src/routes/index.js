const userRoute = require('./users');
const siteRoute = require('./site');
const hocvienRoute = require('./hocviens')
const profileRoute = require('./profiles')
const accountRoute = require('./accounts')
const checkUser = require('../app/middlewares/CheckUser')
const khoaRoute = require('./khoas')
const chuyenNganhRoute = require('./chuyennganhs')
const MonHocRoute = require('./monhoc')

const lopHocRoute = require('./lopHoc')
const giaovienroute = require('./teachers')
const hocphanroute = require('./hocphans')
const dkhproute = require('./dangkihocphan')
const hkroute = require('./hockys')
function route(app) {
  app.use('/profiles', checkUser.verifyToken, profileRoute);
  app.use('/hocviens', checkUser.verifyToken, hocvienRoute);

  app.use('/users', checkUser.verifyToken, userRoute);
  app.use('/account', accountRoute);
  app.use('/', checkUser.verifyToken, siteRoute);
  app.use('/thongtinsinhvien', checkUser.verifyToken);
  app.use('/khoas', checkUser.verifyToken, khoaRoute);
  app.use('/chuyennganhs', checkUser.verifyToken, chuyenNganhRoute);
  app.use('/monhocs', checkUser.verifyToken, MonHocRoute);
  app.use('/lophocs', checkUser.verifyToken, lopHocRoute);
  app.use('/giaoviens', checkUser.verifyToken, giaovienroute);
  app.use('/hocphans', checkUser.verifyToken, hocphanroute);
  app.use('/dkhps', checkUser.verifyToken, dkhproute);
  app.use('/hockys', checkUser.verifyToken, hkroute);
  //   app.post('/news', (req, res) => {
  //     console.log(req.body);
  //     res.send('')
  //   })

  //   app.get('/', (req, res) => {
  //     res.render('trangchu')
  //   });
}

module.exports = route;
