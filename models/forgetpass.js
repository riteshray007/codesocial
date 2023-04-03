const mongoose = require('mongoose')


const forgetpassSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    accessToken : {
        type : String,
        required : true,
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