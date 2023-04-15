const passport = require('passport')
const googleStartegy = require('passport-google-oauth').OAuth2Strategy;
const env = require('./environment');
const crypto = require('crypto')

const User = require('../models/user');

passport.use(new googleStartegy({
    clientID : env.google_client_id ,
    clientSecret : env.google_client_secret  ,
    callbackURL : env.google_call_back_url ,
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