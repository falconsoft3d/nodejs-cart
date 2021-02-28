const { Router } = require('express');
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

router.get('/admin', (req, res) =>{
    res.render('admin', {
            title: process.env.APPNAME}
            );
});

module.exports = router;