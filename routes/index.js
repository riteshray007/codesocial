const express = require('express');

var router = express.Router()

router.get('/' , require('../controllers/home_controller').home )

console.log('router from routes is loaded');
module.exports = router ;