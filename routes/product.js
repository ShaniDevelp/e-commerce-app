const express =  require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const Auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.get('/', productController.get_All_Products);

router.post('/create', upload.fields([{ name: 'thumbnailImage', maxCount: 1 }, { name: 'images', maxCount: 10 }]), productController.create_Product);

router.get('/:id', productController.get_One_Product);

router.post('/delete/:id', productController.delete_Product);

router.post('/update/:id', productController.update_Product);

module.exports = router;