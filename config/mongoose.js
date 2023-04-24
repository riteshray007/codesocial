const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://0.0.0.0:27017
/${env.db}`);

const db = mongoose.connection

db.on('error' , console.error.bind(console , 'error connecting to database') )

db.once('open', ()=>{
    console.log(" connected to database " );
} )

module.exports = db ;
