const express = require('express');
const router = express.Router();

const DepartmentController = require('../controllers/departments.controller')

router.get('/departments', DepartmentController.getAll);

router.get('/departments/random', DepartmentController.getRandom);

router.get('/departments/:id', DepartmentController.getDepById);

router.post('/departments', DepartmentController.postDep);

router.put('/departments/:id', DepartmentController.changeDepById );

router.delete('/departments/:id', DepartmentController.deleteDep );

module.exports = router;
