const express = require('express');
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

// var i18n = require('i18n');
const fs = require('fs');
console.clear();

const pathDataBase = path.join(__dirname, 'database/db.sqlite')
var sqlite3 = require('sqlite3').verbose();

if(fs.existsSync( pathDataBase ) ){
        console.log("M1: The db.sqlite EXISTS: ".green);
        var db = new sqlite3.Database( pathDataBase );
    }else{
        // We create demo data if the database does not exist
        console.log("M1: The db.sqlite NOT EXISTS ".red);
        console.log("M1.1: Created Database: db.sqlite".blue);
        console.log(pathDataBase.blue);
        var db = new sqlite3.Database( pathDataBase );
        
        db.serialize(function() {
            // Table Create
            db.run( fs.readFileSync( path.join(__dirname, 'database/users.sql')).toString());
            db.run( fs.readFileSync( path.join(__dirname, 'database/products.sql')).toString());
            db.run( fs.readFileSync( path.join(__dirname, 'database/comments.sql')).toString());
            db.run( fs.readFileSync( path.join(__dirname, 'database/categories.sql')).toString());
            // Table Insert
            db.run("INSERT INTO users( name, password, rol, active) VALUES('admin', '"+md5('x1234567890')+"', 'admin', 1);");
            db.run("INSERT INTO users( name, password, rol, active) VALUES('demo', '"+md5('demo')+"', 'user', 1);");
        })

        db.each("SELECT * FROM users", function(err, row) {
            console.log(row.id + ": " + row.name);
        });
    }

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
    let sql = "SELECT * FROM users  WHERE name='" + username + "' AND password='" + md5(password) + "'";
    const sqlRes = db.get(sql);

    console.log(sql);
    console.log(sqlRes);

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

// Routs
app.use(require('./routes/index'));
// var routes = require('./routes/index')(passport);


app.post('/login',
passport.authenticate('local', { successRedirect: '/admin',
                                   failureRedirect: '/login' }));

app.use(express.static(path.join(__dirname,'public')));

app.listen(port, ()=>{
    console.log(`M2: Server on port ${port}`.green);
})
