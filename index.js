const express = require('express');
const path = require('path');
const expresslayouts = require('express-ejs-layouts');
const port = 8000;
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport')
const passportlocal = require('./config/passport-local-strategy');
const mongoStore = require('connect-mongo')
const sassmiddleware = require('node-sass-middleware');

const app = express();

app.use(sassmiddleware({
    src: '/assets/scss',
    dest : '/assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}))
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieparser());

app.use(expresslayouts);
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true );


app.use(express.static('./assets'))
app.set('view engine' , 'ejs');
app.set('views' , './views');

app.use(session({
    name : 'codesocial',
    secret : 'youcantakeanything',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge: (1000*60*100)
    },
    store : mongoStore.create({
        mongoUrl : 'mongodb://localhost/test-app',
        autoRemove : 'disabled'
    })
}))
app.use(passport.initialize());
app.use(passport.session()); 
app.use(passport.setAuthenticatedUser)

app.use('/' , require('./routes/index'))


app.listen(port , function(err){
    if(err){
        console.log('error while starting server')
    }
  
    console.log('server is running')
})
