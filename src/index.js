const express = require('express');
const colors = require('colors');
const expbhs = require('express-handlebars');
const path = require('path');
require('dotenv').config();
const port = process.env.PORT;
const md5 = require('md5');

// var i18n = require('i18n');
const fs = require('fs');


console.clear();

const pathDataBase = path.join(__dirname, 'database/db.sqlite')

if(fs.existsSync( pathDataBase ) ){
        console.log("M1: The db.sqlite EXISTS: ".green);
    }else{
        // We create demo data if the database does not exist
        console.log("M1: The db.sqlite NOT EXISTS ".red);
        console.log("M1.1: Created Database: db.sqlite".blue);
        console.log(pathDataBase.blue);
        
        var sqlite3 = require('sqlite3').verbose();
        var db = new sqlite3.Database( pathDataBase );
        
        db.serialize(function() {
            // Table Create
            db.run( fs.readFileSync( path.join(__dirname, 'database/users.sql')).toString());
            db.run( fs.readFileSync( path.join(__dirname, 'database/products.sql')).toString());
            // Table Insert
            db.run("INSERT INTO users( name, password, rol, active) VALUES('admin', '"+md5('admin')+"', 'admin', 1);");
            db.run("INSERT INTO users( name, password, rol, active) VALUES('demo', '"+md5('demo')+"', 'user', 1);");
        })

        db.each("SELECT * FROM users", function(err, row) {
            console.log(row.id + ": " + row.name);
        });
        
    }

const app = express();
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

app.use(express.static(path.join(__dirname,'public')));

app.listen(port, ()=>{
    console.log(`M2: Server on port ${port}`.green);
})