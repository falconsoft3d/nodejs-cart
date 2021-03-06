require('dotenv').config();
const controller = { };
var product_md = require("../modles/product");
var category_md = require("../modles/category");

// Index Page
controller.index = (req, res) =>{

    res.render('index', {
            title: process.env.APPNAME}
            );
}


// Dashboard
controller.dashboard = (req, res) =>{
    res.render('dashboard', {
        title: process.env.APPNAME}
        );
}


controller.store =  function(req, res){
    var data = product_md.getAllProducts();
    var categories = category_md.getAllCategories();
    
    data.then(function(products){
        var result = {
            products: products,
            categories: categories, 
            error: false
        };

        console.log( result );

        res.render("store", {data: result});
    }).catch(function(err){
        var result = {
            error: "Could not get posts data"
        };

        res.render("store", {data: result});
    });
};

// Cart
controller.cart = (req, res) =>{
    res.render('cart', {
        title: process.env.APPNAME}
        );
}

// Product
controller.product = (req, res) =>{
    res.render('product', {
        title: process.env.APPNAME}
        );
}

// Contact
controller.contact = (req, res) =>{
    res.render('contact', {
        title: process.env.APPNAME}
        );
}

module.exports = controller;

