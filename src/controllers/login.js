require('dotenv').config();
const controller = { };
var product_md = require("../modles/product");
var category_md = require("../modles/category");

// Login
controller.login = (req, res) =>{
    var categories = category_md.getAllCategories();
    const allPromises = Promise.all([categories]).then(
        function( success )
        { 
            var result = {
                categories: success[0],
                title: process.env.APPNAME,
                error: false
            };
            res.render("login", { data: result });
        }).catch(function(err){
            var result = { error: "Could not get products data" };
            res.render("login", {data: result});
        });
}

// Logout
controller.logout = (req, res) =>{
    req.logout();
    res.redirect('/');
}

// Signup
controller.signup = (req, res) =>{
    res.render('signup', {
        title: process.env.APPNAME}
        );
}

module.exports = controller