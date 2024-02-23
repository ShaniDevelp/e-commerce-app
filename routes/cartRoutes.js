const express = require('express');
const router = express.Router();
const Auth = require('../middleware/auth');
const cartController = require('../controllers/cartController');


router.get('/:id', cartController.get_Cart);
router.post('/add/:id', cartController.create_Cart);
router.patch('/update/:id', cartController.update_Product_In_Cart);
router.delete('/delete/:id', cartController.delete_Product_In_Cart);
router.delete('/deleteCart/:id', cartController.delete_Cart);


module.exports = router;


