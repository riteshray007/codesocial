const passport = require('passport')
const jwtstrategy = require('passport-jwt').Strategy;
const extractjwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let opts = {
    jwtFromRequest : extractjwt.fromAuthHeaderAsBearerToken,
    secretOrKey : 'codesocial'
}

passport.use(new jwtstrategy(opts , function( jwtPayload , done ){
    User.findById( jwtPayload._id , function( err , user){
        if(err){
            console.log('error in finding user from jwt' )
            return ;
        }
        if(user){
            return done(null , user);
        }else{
            return done(null , false );
        }
    })
}))

module.exports = passport ;