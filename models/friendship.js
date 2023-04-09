const mongoose = require('mongoose');
const friendshipSchema = new mongoose.Schema({
    from_user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    to_user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
},{
    timestamps : true
})

const friendship = mongoose.model('friendship' , friendshipSchema );

module.exports = friendship;