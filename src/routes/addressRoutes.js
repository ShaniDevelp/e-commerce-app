const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');


router.get('/:id', addressController.get_Address);
router.post('/add/:id', addressController.create_Address);
router.patch('/update/:id', addressController.update_Address);
router.delete('/delete/:id', addressController.delete_Address);


module.exports = router;

