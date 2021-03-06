var db = require("../common/database");
var conn = db.getConnection();
var q = require("q");

function getAllProducts(){
    var defer = q.defer();
    var query = conn.query('SELECT * FROM products WHERE active = True AND price > 0', function(err, products) {
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(products);
        }
    });

    return defer.promise;
}

function getMostDownload(){
    var defer = q.defer();
    var query = conn.query('SELECT * FROM products WHERE active = True AND price > 0 ORDER BY download LIMIT 3', function(err, products) {
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(products);
        }
    });

    return defer.promise;
}

module.exports = {
    getAllProducts,
    getMostDownload
}