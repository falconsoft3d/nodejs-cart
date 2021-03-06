require('dotenv').config();
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
    dialect : "mysql",
    database: process.env.DB_NAME
});


connection.connect();

function getConnection(){
    if(!connection){
        connection.connect();
    }

    return connection;
}

module.exports = {
    getConnection: getConnection
}