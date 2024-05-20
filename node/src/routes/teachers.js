const express = require('express')
const giaovienRoute = express.Router();
const TeacherController = require('../app/controllers/TeacherController');
giaovienRoute.get('/:id/edit', TeacherController.edit)
giaovienRoute.post('/themgiaovien/insert', TeacherController.insert)
giaovienRoute.get('/themgiaovien', TeacherController.create)
giaovienRoute.delete('/:id', TeacherController.delete)
giaovienRoute.put('/:id', TeacherController.update)
giaovienRoute.get('/', TeacherController.show);

module.exports = giaovienRoute;