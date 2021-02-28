const { Router } = require('express');
const express = require('express');


const router = Router();
require('dotenv').config();
const port = process.env.PORT;
// const stripe = require(process.env.STRIPE_PUBLIC_KEY)(process.env.STRIPE_PRIVATE_KEY);

router.get('/', (req, res) =>{
    res.render('index', {
            title: process.env.APPNAME}
            );
});

router.get('/login', (req, res) =>{
        res.render('login', {
            title: process.env.APPNAME}
            );
});

/*
router.post('/login', (req, res) =>{
    req.authenticate('local', 
        { successRedirect: '/admin',
        failureRedirect: '/login' })
});*/

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login'); //Can fire before session is destroyed?
  });

router.get('/signup', (req, res) =>{
    res.render('signup', {
            title: process.env.APPNAME}
            );
});

router.get('/dashboard', (req, res) =>{
    res.render('dashboard', {
            title: process.env.APPNAME}
            );
});

router.get('/store', (req, res) =>{
    res.render('store', {
            title: process.env.APPNAME}
            );
});

router.get('/contact', (req, res) =>{
    res.render('contact', {
            title: process.env.APPNAME}
            );
});



router.get("/admin", (req, res, next) =>{
    if( req.isAuthenticated() ){
        return next();
        console.log("if( req.isAuthenticated() ){:::: SI");
    }
    res.redirect("/login");
}  ,(req,res) =>{
    res.render('admin');
});


/*
router.get('/*', (req, res) =>{
    res.render('404', {
            title: process.env.APPNAME}
            );
});
*/


module.exports = router;