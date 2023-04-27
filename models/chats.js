const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    message : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
}, {
    timestamps : true
})

const chats = mongoose.model( 'chats' ,  chatSchema );
module.exports = chats; 