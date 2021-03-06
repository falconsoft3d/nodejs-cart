var db = require("../common/database");
var conn = db.getConnection();
var q = require("q");

function getAllCategories(){
    var defer = q.defer();
    var query = conn.query('SELECT * FROM categories', function(err, categories) {
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(categories);
        }
    });

    return defer.promise;
}

module.exports = {
    getAllCategories: getAllCategories,
}