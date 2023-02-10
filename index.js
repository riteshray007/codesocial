const express = require('express');

const port = 8000;

const app = express();

app.get('/' , function(req , res){
    return  res.send('<h1> welcome home  </h1> ')
})

app.listen(port , function(err){
    if(err){
        console.log('error while starting server')
    }

    console.log('server is running')
})