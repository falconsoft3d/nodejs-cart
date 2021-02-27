const { Router } = require('express');
const router = Router();
require('dotenv').config();
const port = process.env.PORT;
// const stripe = require(process.env.STRIPE_PUBLIC_KEY)(process.env.STRIPE_PRIVATE_KEY);

router.get('/', (req, res) =>{
    res.render('index');
});

module.exports = router;