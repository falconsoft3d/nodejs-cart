require('dotenv').config();
const controller = { };
var product_md = require("../modles/product");
var category_md = require("../modles/category");

// Index Page
controller.index =  function(req, res){
    var products = product_md.getMostDownload();
    var categories = category_md.getAllCategories();
    
    const allPromises = Promise.all([products, categories]).then(
        function( success )
        { 
            var result = {
                products: success[0],
                categories: success[1],
                title: process.env.APPNAME,
                error: false
            };
            res.render("index", { data: result });
        }).catch(function(err){
            var result = { error: "Could not get posts data" };
            res.render("index", { data: result });
        });
    };


// Dashboard
controller.dashboard =  function(req, res){
    var products = product_md.getAllProducts();
    var categories = category_md.getAllCategories();
    
    const allPromises = Promise.all([products, categories]).then(
        function( success )
        { 
            var result = {
                products: success[0],
                categories: success[1],
                title: process.env.APPNAME,
                error: false
            };
            res.render("dashboard", { data: result });
        }).catch(function(err){
            var result = { error: "Could not get posts data" };
            res.render("dashboard", { data: result });
        });
    };

/*
controller.store = (req, res) => {
    req.getConnection((err, conn) => {    
        conn.query('SELECT * FROM products', (err, products) =>{
                if (err) {
                    res.json({ error: err })
                }
                res.render('store', {
                    products: products
                });
            })
        });
};
*/

controller.store =  function(req, res){
    var products = product_md.getAllProducts();
    var categories = category_md.getAllCategories();
    
    const allPromises = Promise.all([products, categories]).then(
        function( success )
        { 
            var result = {
                products: success[0],
                categories: success[1],
                title: process.env.APPNAME,
                error: false
            };
            res.render("store", { data: result });
        }).catch(function(err){
            var result = { error: "Could not get posts data" };
            res.render("store", { data: result });
        });
    };

// Cart
controller.cart = (req, res) =>{
    var categories = category_md.getAllCategories();
    const allPromises = Promise.all([categories]).then(
        function( success )
        { 
            var result = {
                categories: success[0],
                title: process.env.APPNAME,
                error: false
            };
            res.render("cart", { data: result });
        }).catch(function(err){
            var result = { error: "Could not get products data" };
            res.render("cart", {data: result});
        });
}

// Product
controller.product = (req, res) =>{
    const { id } = req.params;
    var categories = category_md.getAllCategories();
    const allPromises = Promise.all([categories]).then(
        function( success )
        { 
            var result = {
                categories: success[0],
                title: process.env.APPNAME,
                error: false
            };
            res.render("product", { data: result });
        }).catch(function(err){
            var result = { error: "Could not get products data" };
            res.render("product", {data: result});
        });
}

// Contact
controller.contact = (req, res) =>{
    var categories = category_md.getAllCategories();
    const allPromises = Promise.all([categories]).then(
        function( success )
        { 
            var result = {
                categories: success[0],
                title: process.env.APPNAME,
                error: false
            };
            res.render("contact", { data: result });
        }).catch(function(err){
            var result = { error: "Could not get products data" };
            res.render("contact", {data: result});
        });
}

module.exports = controller;

