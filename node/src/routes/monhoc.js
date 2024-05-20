const express = require('express')
const monHocRoute = express.Router();
const monHocController = require('../app/controllers/MonHocController');
monHocRoute.get('/:id/edit', monHocController.edit)
monHocRoute.post('/themmonhoc/insert', monHocController.insert)
monHocRoute.get('/themmonhoc', monHocController.create)
monHocRoute.delete('/:id', monHocController.delete)
monHocRoute.put('/:id', monHocController.update)
monHocRoute.get('/', monHocController.show);

module.exports = monHocRoute;