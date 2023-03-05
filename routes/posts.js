const express = require('express');
const passport = require('passport');

const router = express.Router();

const post_controller = require("../controllers/post_controller")
router.get('/' , passport.checkAuthentication , post_controller.post )

router.get('/stats' , post_controller.stats);

router.post('/create_post', passport.checkAuthentication , post_controller.create_post)

module.exports = router ;