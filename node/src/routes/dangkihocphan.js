const express = require('express')
const dkhpRoute = express.Router();
const dkhpController = require('../app/controllers/DangKiHocPhanController');
dkhpRoute.get('/:id/dkhp', dkhpController.edit)
dkhpRoute.get('/xemdkhp', dkhpController.create)
dkhpRoute.delete('/:id', dkhpController.delete)
dkhpRoute.get('/', dkhpController.show);
dkhpRoute.get('/:id/danhsachmon', dkhpController.showDanhSachMonHoc);

module.exports = dkhpRoute;