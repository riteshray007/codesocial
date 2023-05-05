const mongoose = require('mongoose')
const multer = require('multer');
const path = require('path');
const POST_PATH = path.join('/uploads/posts/postimages');

const postSchema = new mongoose.Schema({
  content : {
    type : String ,
  }  ,
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
  } , 
  image : {
    type : String
  },
   comments : [{
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'comment'
  }] , 
  likes : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Like'
  }]
} , {
    timestamps : true
});

let storage = multer.diskStorage({
  destination : (req , file , cb)=>{
    cb(null , path.join( __dirname , ".." , POST_PATH ));
  },
  filename : (req , file , cb )=>{
    cb(null , file.fieldname + '-' + Date.now())
  }
})

postSchema.statics.uploadPostImage = multer({storage : storage}).single('image');
postSchema.statics.postpath = POST_PATH;



const Post = mongoose.model("post" , postSchema);

module.exports = Post;