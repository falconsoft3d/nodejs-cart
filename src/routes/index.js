const { Router } = require('express');
const router = Router();
const mainController =  require('../controllers/main');
const loginController =  require('../controllers/login');
require('dotenv').config();

// main
router.get('/',  mainController.index );
// Login
router.get('/login', loginController.login);
router.get('/logout', loginController.logout);
router.get('/signup', loginController.signup);

// Other Routes
router.get('/dashboard', mainController.dashboard);
router.get('/store', mainController.store);
router.get('/cart', mainController.cart);
router.get('/product', mainController.product);
router.get('/contact', mainController.contact);


router.get("/admin", (req, res, next) =>{
    if( req.isAuthenticated() ){
        return next();
    }
    res.redirect("/login");
}  ,(req,res) =>{
    res.render('admin');
});


module.exports = router;