const express = require('express')
const lopHocRouter = express.Router();
const lopHocController = require('../app/controllers/LopHocController');
lopHocRouter.get('/:id/edit', lopHocController.edit)
lopHocRouter.post('/themlophoc/insert', lopHocController.insert)
lopHocRouter.get('/themlophoc', lopHocController.create)
lopHocRouter.delete('/:id', lopHocController.delete)
lopHocRouter.put('/:id', lopHocController.update)
lopHocRouter.get('/', lopHocController.show);

module.exports = lopHocRouter;