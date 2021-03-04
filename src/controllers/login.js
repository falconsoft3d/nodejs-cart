const controller = require('./main');

require('dotenv').config();
const controler = { };

// Login
controler.login = (req, res) =>{
    res.render('login', {
        title: process.env.APPNAME}
        );
}

// Logout
controler.logout = (req, res) =>{
    res.render('logout', {
        title: process.env.APPNAME}
        );
}

// Signup
controler.signup = (req, res) =>{
    res.render('signup', {
        title: process.env.APPNAME}
        );
}

module.exports = controler