const express = require('express');
const router = express.Router();
const Auth = require('../middleware/auth');
const categoryController = require('../controllers/categoryController');


router.get('/', categoryController.get_all_categories);
router.post('/create', categoryController.create_category);


module.exports = router