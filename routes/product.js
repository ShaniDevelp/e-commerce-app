const express =  require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const Auth = require('../middleware/auth');


router.get('/', productController.get_All_Products);

router.post('/create', productController.create_Product);

router.get('/:id', productController.get_One_Product);

router.post('/delete/:id', productController.delete_Product);

router.post('/update/:id', productController.update_Product);

module.exports = router;