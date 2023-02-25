const express = require('express');
const path = require('path');
const expresslayouts = require('express-ejs-layouts');
const port = 8000;
const db = require('./config/mongoose');

const app = express();
app.use(expresslayouts);
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true );
app.use(express.static('./assets'))
app.set('view engine' , 'ejs');
app.set('views' , './views');

app.use('/' , require('./routes/index'))


app.listen(port , function(err){
    if(err){
        console.log('error while starting server')
    }
  
    console.log('server is running')
})
