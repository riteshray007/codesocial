const express = require('express')
const router = express.Router();
const chats_controller = require('../controllers/chats_controller');

router.get('/' ,  chats_controller.allchats  )
router.post( '/create' , chats_controller.createmsg  )
router.get('/delete' , chats_controller.deletemsg);

module.exports = router;