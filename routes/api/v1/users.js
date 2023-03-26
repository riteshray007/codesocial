const express = require('express')
const router = express.Router();

const userapi = require('../../../controllers/api/v1/users_api')

router.post( '/create-session' , userapi.create_session  )






module.exports = router;