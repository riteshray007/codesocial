const post = require('../models/posts')
const user = require('../models/user');
const comments = require('../models/comments')
const likes = require('../models/likes');
// const nodemailer = require('../mailer/comments_mailer');
const CommentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const path = require('path');
const fs = require('fs');

module.exports.post = async ( req , res )=>{  

    try{
        let userdata = await user.find({})        
        let postd = await post.find({})
        .sort('-createdAt')
        .populate('user likes')
        .populate({
            path : 'comments',
            options : {
                sort : { 'createdAt' : '-1' }
            },  
            populate : {
                path : 'likes user',
            },            
        })
        
        // postd.comments.populate('user');

        // return res.status(200).json({
        //     post : postd,
        // })
        // console.log( postd )
        return res.render('posts' , {
            posts : postd,
            users : userdata
        } )
        
    }catch(err){
        console.log(err);
        return ;
    }
}

module.exports.deletePost = async (req , res)=>{

    try{

        let data = await post.findById( req.query.id )
        .populate({
            path : 'comments',
        })
        // console.log(data.comments);
        if(data.image){
            console.log('yes a image found ');
            if(fs.existsSync(path.join(__dirname , '..' , data.image ))){
                fs.unlink(path.join( __dirname , '..' , data.image ) , (err)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log('removed post image from disk storage')
                    }
                });
            }
        }
       await comments.deleteMany({post : req.query.id})
       await likes.deleteMany({ likeable : req.query.id , onModel : 'Post' });
       await likes.deleteMany({ likeable: {$in : data.comments}  })
       data.remove();
        if(req.xhr){
            return res.status(200).json({
                data : {
                    post_id : req.query.id,
                },
                message : 'post deleted',
            })
        }
        return res.redirect('back')
    }catch(err){
        console.log(err)
        return 
    }
}

module.exports.stats= (req , res)=>{
    return res.end('<h1> welcome to posts stats </h1>')
}

module.exports.create_post =  (req , res)=>{
    try{
        post.uploadPostImage(req , res , async function (err){
            if(err){
                console.log(err);
            }
            if(req.file || req.body.content  ){
                // console.log('content - ' , req.body.content  );
                var postd = new post ({
                    user : req.user._id,
                })
                if(req.body.content){
                    postd.content = req.body.content;
                }
                if(req.file){
                    postd.image = post.postpath + '/' + req.file.filename
                }
                await postd.save();
                
                if(req.xhr){
                    postd = await postd.populate('user');
                    return res.status(200).json({
                        data : {
                            path : req.app.locals.assetPath('images/gamer.png') ,
                            post : postd
                        },
                        message : 'post created'
                    })
                }
            }
            return res.redirect('/posts')
        })
    }catch(err){
        console.log(err)
        return ;
    }
}

module.exports.create_comment = async(req , res)=>{

    try{
        let posts = await post.findById( req.query.id )
        if(posts){
        let datac = await comments.create({
            content : req.body.content,
            user : req.user._id,
            post : req.query.id
        })

        posts.comments.push(datac)
        posts.save();
        if(req.xhr){
            datac = await datac.populate('user' , ' _id email name avatar  ');
            console.log(datac);
            // nodemailer.newComment(datac);
            let job =  queue.create( 'emails' , datac  ).save( (err)=>{
                if(err){
                    console.log('err in creating a queue' , err );
                    return ;
                }
                console.log(job.id);
            } )
            return res.status(200).json({
                data : {
                    path : req.app.locals.assetPath('images/gamer.png'),
                    comment : datac
                },
                message : 'comment data',
            })
        }
        return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return ;
    }
}

 module.exports.deleteComment = async (req , res)=>{
    let id = req.query.id;
    // console.log('delete id - ' , id );
    try{
        let data = await comments.findById(id)
        // console.log(data);

        await likes.deleteMany({ likeable: {$in : data}  })
        // console.log(data.post);
        let postid = data.post ;
        // console.log(postid)
        data.remove();

        await post.findByIdAndUpdate(postid , { $pull : {comments : id }} )
        if(req.xhr){
            return res.status(200).json({
                data : {
                    comm : id 
                },
                message : 'comment deleted',
            })
        }
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return ;
    }
 }