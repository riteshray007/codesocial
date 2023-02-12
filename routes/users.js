const express = require('express');

const router = express.Router();

const users_controller = require('../controllers/users_controller')

router.get('/' , users_controller.users )
router.get('/profile' , users_controller.profile )

module.exports = router ;