const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  content : {
    type : String ,
    required : true
  }  ,
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
  } , 
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

const Post = mongoose.model("post" , postSchema);

module.exports = Post;