const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path')
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    avatar : {
        type : String
    },
    friendships : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'friendship'
    }]
} , {timestamps : true } );

let storage = multer.diskStorage({
    destination: (req , file , cb )=>{
        cb(null ,  path.join( __dirname , '..' , AVATAR_PATH )) ;
    },
    filename: (req, file , cb )=>{
        cb( null , file.fieldname + '-' + Date.now() )
    }
})

    // static functions by mongoose  
    userSchema.statics.uploadedAvatar = multer({ storage : storage}).single('avatar');
    userSchema.statics.avatarpath = AVATAR_PATH;



const user = mongoose.model('user' , userSchema);

module.exports = user;