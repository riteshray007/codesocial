const express = require('express');

const router = express.Router();

const post_controller = require("../controllers/post_controller")
router.get('/' , post_controller.post )

router.get('/stats' , post_controller.stats);

module.exports = router ;