const express = require('express');

const router = express.Router()

const home_controller = require('../controllers/home_controller')


router.use('/' , require('./posts'));
router.get('/about' , home_controller.about);
 router.use('/posts' ,  require('./posts'));
router.use('/users' , require('./users') );
router.use('/likes' , require('./likes'));

router.use('/api' , require('./api') );
router.use( '/chatbox' , require('./chats'));

module.exports = router ;