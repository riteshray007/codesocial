const express = require('express')
const passport = require('passport')
const router = express.Router()

const postapi = require('../../../controllers/api/v1/posts_api');

router.get('/' , postapi.index);

router.delete('/:id' , passport.authenticate('jwt', { session: false }) ,postapi.deletePost);

module.exports = router;