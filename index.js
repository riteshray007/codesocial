const express = require('express');

const port = 8000;

const app = express();

app.get('/' , require('./routes/index'))

app.listen(port , function(err){
    if(err){
        console.log('error while starting server')
    }

    console.log('server is running')
})