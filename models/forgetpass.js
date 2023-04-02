const mongoose = require('mongoose')
const crypto = require('crypto');

const forgetpassSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    accessToken : {
        type : String,
        required : true,
        default : crypto.randomBytes(6).toString('hex'),
    },
    validity : {
        type : Boolean,
        default : false,
    }
}, {
    timestamps : true
}) ;

const passtoken = mongoose.model( 'forgetpass' , forgetpassSchema );

module.exports = passtoken;