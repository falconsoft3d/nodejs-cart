var db = require("../common/database");
var conn = db.getConnection();
var q = require("q");

function getAllProducts(){
    var defer = q.defer();
    var query = conn.query('SELECT * FROM products', function(err, products) {
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(products);
        }
    });

    return defer.promise;
}

module.exports = {
    getAllProducts: getAllProducts,
}