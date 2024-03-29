const express =  require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const Auth = require('../middleware/auth');
const upload = require('../middleware/fileUpload')


router.get('/', Auth, productController.get_All_Products);

router.post('/create', upload.fields([{ name: 'thumbnailImage', maxCount: 1 }, { name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }]), productController.create_Product);

router.get('/:id', productController.get_One_Product);

router.post('/delete/:id', productController.delete_Product);

router.put('/update/:id',  upload.fields([{ name: 'thumbnailImage', maxCount: 1 }, { name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }]), productController.update_Product);

module.exports = router;