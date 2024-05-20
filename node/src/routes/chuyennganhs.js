const express = require('express')
const chuyenNganhRouter = express.Router();
const chuyenNganhController = require('../app/controllers/chuyenNganhController');
chuyenNganhRouter.get('/:id/edit', chuyenNganhController.edit)
chuyenNganhRouter.post('/themchuyennganh/insert', chuyenNganhController.insert)
chuyenNganhRouter.get('/themchuyennganh', chuyenNganhController.create)
chuyenNganhRouter.delete('/:id', chuyenNganhController.delete)
chuyenNganhRouter.put('/:id', chuyenNganhController.update)
chuyenNganhRouter.get('/', chuyenNganhController.show);

module.exports = chuyenNganhRouter;