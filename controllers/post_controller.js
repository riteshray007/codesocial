const post = require('../models/posts')
const user = require('../models/user');
const comments = require('../models/comments')

module.exports.post = async (req , res )=>{  

    try{
        let userdata = await user.find({})        
        let postd = await post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
                path : 'user'
            }
        })
        
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
        
        for(let x of data.comments){
            await comments.findByIdAndDelete(x)
        }
        data.remove();
        if(req.xhr){
            return res.status(200).json({
                data : {
                    post_id : req.query.id,
                },
                message : 'post deleted'
            })
        }
        req.flash('error' , ' post removed !' )
        return res.redirect('back')
    }catch(err){
        console.log(err)
        return 
    }

}

module.exports.stats= (req , res)=>{
    return res.end('<h1> welcome to posts stats </h1>')
}

module.exports.create_post = async (req , res)=>{
    try{
        let postd = await post.create({
            content : req.body.content,
            user : req.user._id
        })
        if(req.xhr){
            postd = await postd.populate('user');
            return res.status(200).json({
                data : {
                    post : postd
                },
                message : 'post created'
            })
        }
        req.flash('error' , 'post published! ')
        return res.redirect('/posts')
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
            datac = await datac.populate('user');
            return res.status(200).json({
                data : {
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
    try{
        let data = await comments.findById(id)
        
        let postid = data.post ;
        data.remove();

        await post.findByIdAndUpdate(postid , { $pull : {comments : id }} )

        return res.redirect('back');
    }catch(err){
        console.log(err);
        return ;
    }
 }