

const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const auth = require('../controllers/auth');
module.exports = router;


 //Routes
 router.get('/signup', auth.register);

router.get('/', userController.view);
router.post('/', userController.find);

router.get('/add-event', userController.form);

router.post('/add-event', userController.create);

router.get('/edit-event/:id', userController.edit);

router.post('/edit-event/:id', userController.update);
//router.get('/:id',userController.delete);
router.get('/view-event/:id', userController.viewall);
/*
router.get('/viewuser/:id', userController.viewall);
router.get('/:id',userController.delete);
  

*/