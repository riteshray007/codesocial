const express = require('express')
const router = express.Router();

const likescontroller = require( '../controllers/like_controller' )

router.get( '/toggle' , likescontroller.togglelike )

module.exports = router;