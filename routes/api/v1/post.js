const express = require('express')

const router = express.Router()

const postapi = require('../../../controllers/api/v1/posts_api');


router.get('/' , postapi.index);

router.get('/delete_post' , postapi.deletePost);


module.exports = router;