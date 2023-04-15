const env = require('./config/environment');

const express = require('express');
const path = require('path');
const expresslayouts = require('express-ejs-layouts');
const port = 8000;
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportjwt = require('./config/passport-jwt-strategy');
const passportlocal = require('./config/passport-local-strategy');
const googleauth = require('./config/passport-google-oauth2-strategy');
const mongoStore = require('connect-mongo')
const sassmiddleware = require('node-sass-middleware');
const flash = require('connect-flash');


const app = express();
const cmiddleware = require('./config/middleware')
const chatserver = require( 'http' ).Server(app);
const chatsocket = require('./config/chat_sockets').chatsockets(chatserver);
chatserver.listen(4000);
console.log('chatserver is listening at port number 4000');



app.use(sassmiddleware({
    src: path.join( __dirname , env.assets_path ,  'scss' ) ,
    dest : path.join( __dirname , env.assets_path ,  'css'),
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}))
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieparser());

app.use(expresslayouts);
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true );


app.set('view engine' , 'ejs');

app.use('/uploads' , express.static(__dirname + '/uploads') )
app.use(express.static(path.join( __dirname , env.assets_path  )))
app.set('views' , './views');

app.use(session({
    name : 'codesocial',
    secret : env.session_cookie_key,
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge: (1000*60*60*24)
    },
    store : mongoStore.create({
        mongoUrl : 'mongodb://localhost/test-app',
        autoRemove : 'disabled'
    })
}))
app.use(passport.initialize());
app.use(passport.session()); 
app.use(passport.setAuthenticatedUser)
app.use(flash())
app.use(cmiddleware.setFlash);

app.use('/' , require('./routes/index'))


app.listen(port , function(err){
    if(err){
        console.log('error while starting server')
    }
  
    console.log('server is running')
})
