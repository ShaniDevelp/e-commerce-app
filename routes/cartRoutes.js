const express = require('express');
const router = express.Router();
const Auth = require('../middleware/auth');
const cartController = require('../controllers/cartController');


router.get('/', Auth, cartController.get_Cart);
router.post('/add', Auth, cartController.create_Cart);
router.patch('/update', Auth,  cartController.update_Product_In_Cart);
router.delete('/delete',Auth, cartController.delete_Product_In_Cart);
router.delete('/deleteCart/:id', cartController.delete_Cart);


module.exports = router;


