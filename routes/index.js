const express = require('express');

const router = express.Router()

const home_controller = require('../controllers/home_controller')


router.get('/' , home_controller.home);
router.get('/about' , home_controller.about);
 router.use('/posts' , require('./posts') );
router.use('/users' , require('./users') );

router.use('/api' , require('./api') );

module.exports = router ;