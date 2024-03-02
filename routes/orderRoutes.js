const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


router.get('/', orderController.get_All_Orders);
router.get('/:id', orderController.get_User_Orders);
router.post('/add', orderController.create_Order);
router.patch('/update/:id', orderController.update_Order);
router.delete('/delete/:id', orderController.delete_Order);


module.exports = router;

