const express = require('express');
const passport = require('passport');

const router = express.Router();

const users_controller = require('../controllers/users_controller')

router.get('/' , users_controller.users )
router.get('/profile' , passport.checkAuthentication ,users_controller.profile )
router.get('/signup' , users_controller.signup )
router.post('/create' , users_controller.create)
router.get('/signin' , users_controller.signin )
router.post('/update_profile' , users_controller.update_profile);
router.get('/signout', users_controller.signout )
// router.post('/create_session' , users_controller.create_session );
router.post('/create_session',  passport.authenticate(
    'local',
    { failureRedirect : '/users/signin' }
) , users_controller.create_session );
router.post( '/forget-password' , users_controller.forget_password  )
router.get( '/confirm-reset' , users_controller.confirmReset )
router.post( '/setnewpassword' , users_controller.setnewpassword )
router.get('/auth/google' , passport.authenticate( 
    'google' , { scope : ['profile' , 'email'] }) );
router.get('/auth/google/callback' , passport.authenticate(
     'google' , {failureRedirect: '/users/sign-in'}) , users_controller.create_session )

module.exports = router ;