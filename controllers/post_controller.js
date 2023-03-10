const post = require('../models/posts')
const user = require('../models/user');
const comments = require('../models/comments')

module.exports.post = (req , res )=>{

    post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })
    .exec(function(err , post){
        if(err){
            console.log('err while populating ')
            return ;
        }
        return res.render( 'posts' , {
            posts : post
        })
    })



}

module.exports.deletePost = (req , res)=>{
    post.findById( req.query.id , (err , data)=>{
        if(err){
            console.log('error ' + err);
            return ;
        }
        // console.log(data);
        for( let x of data.comments ){
            comments.findByIdAndDelete(x , (err  )=>{
                if(err){
                    console.log( "err in comments fething " + err);
                    return 
                }
            } )
        }
        data.remove();
        return res.redirect('back')
        
    } )
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

 module.exports.create_comment = (req , res)=>{
    // comments.create({
    //     content : req.body.content,
    //     user : req.user._id,
    //     post : req.query.id
    // } , (err , data)=>{
    //     if(err){
    //         console.log(err);
    //         return ;
    //     }
    //     console.log(data);
    //     return res.redirect('back');
    // })   
    post.findById( req.query.id , (err , post )=>{
        if(err){
            console.log(err)
            return ;
        }
        if(post){
            comments.create({
                content : req.body.content,
                user : req.user._id,
                post : req.query.id 
            } , (err , data)=>{
                if(err){
                    console.log(err);
                    return 
                }
                post.comments.push(data);
                post.save();
                return res.redirect('back');
            })
        }
    })
    

 }