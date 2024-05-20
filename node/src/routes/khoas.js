const express = require('express')
const khoaRouter = express.Router();
const khoaController = require('../app/controllers/KhoaController');
khoaRouter.get('/:id/edit', khoaController.edit)
khoaRouter.post('/themkhoa/insert', khoaController.insert)
khoaRouter.get('/themkhoa', khoaController.create)
khoaRouter.delete('/:id', khoaController.delete)
khoaRouter.put('/:id', khoaController.update)
khoaRouter.get('/', khoaController.show);

module.exports = khoaRouter;