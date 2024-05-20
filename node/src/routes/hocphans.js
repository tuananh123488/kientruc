const express = require('express')
const hocPhanRoute = express.Router();
const hocPhanController = require('../app/controllers/HocPhanController');
hocPhanRoute.get('/:id/edit', hocPhanController.edit)
hocPhanRoute.post('/themhocphan/insert', hocPhanController.insert)
hocPhanRoute.get('/themhocphan', hocPhanController.create)
hocPhanRoute.delete('/:id', hocPhanController.delete)
hocPhanRoute.put('/:id', hocPhanController.update)
hocPhanRoute.get('/', hocPhanController.show);
hocPhanRoute.get('/:id/showDanhSach', hocPhanController.showDanhSachSV);

module.exports = hocPhanRoute;