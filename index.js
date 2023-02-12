const express = require('express');
const path = require('path');

const port = 8000;

const app = express();

app.set('view engine' , 'ejs');
app.set('views' , './views');

app.use('/' , require('./routes/index'))


app.listen(port , function(err){
    if(err){
        console.log('error while starting server')
    }
  
    console.log('server is running')
})
