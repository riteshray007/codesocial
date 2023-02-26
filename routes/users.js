const express = require('express');

const router = express.Router();

const users_controller = require('../controllers/users_controller')

router.get('/' , users_controller.users )
router.get('/profile' , users_controller.profile )
router.get('/signup' , users_controller.signup )
router.post('/create' , users_controller.create)
router.get('/signin' , users_controller.signin )

module.exports = router ;