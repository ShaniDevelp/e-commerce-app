const express =  require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const Auth = require('../middleware/auth');

router.post('/', userController.create_User);

router.post('/login', userController.login_User);

router.get('/check',Auth, userController.check_User);

router.post('/users/logout', Auth, userController.logout_user);

router.post('/users/logoutAll', Auth, userController.logout_All);


module.exports = router;