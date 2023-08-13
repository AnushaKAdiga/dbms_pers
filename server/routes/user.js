

const express = require('express');

const router = express.Router();


const userController = require('../controllers/userController');
const auth = require('../controllers/auth');
module.exports = router;


 //Routes
 router.get('/signup', auth.viewsignup);
 router.get('/login', auth.viewlogin);
 router.post('/login', auth.signin);
 router.get('/logina', auth.viewlogina);
 router.post('/logina', auth.signina);
 router.get('/signupa', auth.viewsignupa);
 router.post('/signupa', auth.registera);
 router.get('/userindex',auth.useri);
 //srouter.('/eventregister/:id',auth.report1);
 router.get('/eventregister/:id',auth.eventregister);
 router.get('/report1/:id',auth.viewreport);
router.get('/report2/:id',auth.stats);
 //router.get('/admintable', auth.viewsevent);
 router.get('/index', auth.viewindex);
//router.get('/admintable',auth.getadmintable);
 router.post('/signup',auth.register)
router.get('/admintable',userController.viewind);
//router.get('/', userController.view);
router.post('/', userController.find);
router.get("/",userController.homev);
router.get("/user",auth.userv);
router.get("/admin",userController.adminv);
router.get('/myevents/:id',userController.events);

//router.po("/",userController.homev);

router.get('/add-event', userController.form);

router.post('/add-event', userController.create);

router.get('/edit-event/:id', userController.edit);
router.get('/home',auth.home);
router.post('/edit-event/:id', userController.update);
router.get('/del/:id',userController.delete);
router.get('/view-event/:id', userController.viewall);
/*
router.get('/viewuser/:id', userController.viewall);
router.get('/:id',userController.delete);
  

*/