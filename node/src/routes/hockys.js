const express = require('express')
const hocKyRouter = express.Router();
const hocKyController = require('../app/controllers/HocKyController');
hocKyRouter.get('/:id/edit', hocKyController.edit)
hocKyRouter.post('/themhocky/insert', hocKyController.insert)
hocKyRouter.get('/themhocky', hocKyController.create)
hocKyRouter.delete('/:id', hocKyController.delete)
hocKyRouter.put('/:id', hocKyController.update)
hocKyRouter.get('/', hocKyController.show);

module.exports = hocKyRouter;