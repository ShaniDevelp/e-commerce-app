const express = require('express');
const router = express.Router();
const Auth = require('../middleware/auth');
const cartController = require('../controllers/cartController');


router.get('/cart', Auth, cartController.get_Cart);


module.exports = router;


