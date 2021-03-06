const express = require('express');
const { urlencoded } = require('express');
const colors = require('colors');
const expbhs = require('express-handlebars');
const path = require('path');
require('dotenv').config();
const port = process.env.PORT;
const md5 = require('md5');
const passport = require('passport');
const cookiesParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;
var crypto = require('crypto');
const morgan = require('morgan');

// var i18n = require('i18n');
const fs = require('fs');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser(process.env.SECRET_WEB));
app.use(session({
        secret: process.env.SECRET_WEB,
        resave: true,
        saveUninitialized: true
    }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    done(null,{  id:1, name: 'Marlon' })
})


passport.use(new PassportLocal( function(username, password, done) {
    if(username === 'admin' && password === 'x1234567890' ) return done(null, {  id:1, name: 'Marlon' });
    done(null,false);
}));

app.set('views',  path.join(__dirname, 'views'));
app.engine('.hbs', expbhs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

// Midelware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

// Routs
app.use(require('./routes/index'));
// var routes = require('./routes/index')(passport);


app.post('/login',
passport.authenticate('local', { successRedirect: '/admin',
                                   failureRedirect: '/login' }));

app.use(express.static(path.join(__dirname,'public')));

app.listen(process.env.PORT || port, ()=>{
    console.log(`M2: Server on port ${port}`.green);
})
