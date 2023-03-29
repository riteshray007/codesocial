const passport = require('passport')
const googleStartegy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto')

const User = require('../models/user');

passport.use(new googleStartegy({
    clientID : "23546391621-7qsau9195su6s4qaigihbfq1pcf3jo8s.apps.googleusercontent.com",
    clientSecret : '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',
    callbackURL : "http://localhost:8000/users/auth/google/callback",
},
    function(accestoken , refreshtoken , profile , done ){
        User.findOne({email : profile.emails[0].value}).exec((err  , user)=>{
            if(err){
                console.log(err , "in google oauth strategy-passport");
                return ;
            }
            console.log(profile);
            if(user){
                return done(null , user);
            }
            else{
                User.create({
                    name: profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                } , function(err , user){
                    if(err){
                        console.log(err , "in google oauth strategy-passport");
                        return ;
                    }
                    return(null , user);
                } )
            }

        })        
    }
))



module.exports = passport;