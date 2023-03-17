const passport = require('passport')

var LocalStrategy = require('passport-local').Strategy;

const user = require('../models/user')

//authentication using passport.js

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback : true
    //above line is not required if u have unique usernames in your db which is email in our case 
    // also we have allowed user to have common name 
},
    function (req , email, password, done) {
        user.findOne({ email: email }, (err, user) => {
            if (err) {
                req.flash('error' , err );
                return done(err);
            }
            if (!user || user.password != password){
                req.flash('error' , "invalid credentials" )
                return done(null, false);
            }
            return done(null, user);
        })
    }))

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user, done) => {
    done(null, user);
})


//deserializing the user from the key in the cookies

passport.deserializeUser((id, done) => {
    user.findById(id, (err, user) => {
        if (err) {
            console.log('error in finding user --> deserialising')
            return done(err);
        }
        return done(null, user);

    })
})

//check if the user is authenticated 
passport.checkAuthentication = function( req , res , next){
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not signed in
    return res.redirect('/users/signin'); 
}

passport.setAuthenticatedUser = function(req , res  , next){
    //req.user have current signin user info from session cookies and we are sending it to locals for views to acces
    if(req.isAuthenticated()){
        res.locals.user = req.user ;
    }
    next();
}



module.exports = passport;