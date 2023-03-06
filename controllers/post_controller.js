const post = require('../models/posts')
const user = require('../models/user');
module.exports.post = (req , res )=>{

    post.find({}).populate('user').exec(function(err , post){
        if(err){
            console.log('err while populating ')
            return ;
        }
        return res.render( 'posts' , {
            posts : post
        })
    })

}

module.exports.stats= (req , res)=>{
    return res.end('<h1> welcome to posts stats </h1>')
}

module.exports.create_post = (req , res)=>{
    post.create({
       content : req.body.content, 
       user : req.user._id
    } , (err)=>{
       if(err){
          console.log("err while creating  ")
          return ;
       }
    })

    return res.redirect('/posts');
 }