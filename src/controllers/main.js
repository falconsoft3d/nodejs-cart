require('dotenv').config();
const controller = { };

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

// Store
controller.store = (req, res) => {
    req.getConnection((err, conn) => {    
        conn.query('SELECT * FROM products', (err, products) =>{
                if (err) {
                    res.json({ error: err })
                }
                res.render('store', {
                    data: products
                });
            })
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

