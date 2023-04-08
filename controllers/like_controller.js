const User = require('../models/user');
const Comment = require('../models/comments');
const Post = require('../models/posts');
const Like = require('../models/likes');



module.exports.togglelike = async (req , res )=>{
 
    try{
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById( req.query.id ).populate('likes');
        }else{
            likeable = await Comment.findById( req.query.id ).populate('likes');
        }

        let existLike = await Like.findOne({
            user : req.user._id ,
            likeable : req.query.id,
            onModel : req.query.type 
        } )
        if(existLike){
            likeable.likes.pull(existLike)
            existLike.remove();
            likeable.save();
            deleted = true;
        }
        else{
            let newLike = await Like.create({
                user : req.user._id,
                onModel : req.query.type,
                likeable : req.query.id    
            })
            likeable.likes.push(newLike);
            likeable.save();           
        }
        if(req.xhr){

            return res.status(200).json({
                data : {
                    deleted : deleted,                    
                },
                message : ' request succesfully  '
            })
        }
        return res.redirect('back');
    }catch(err){
        console.log(err , " from toggle likes- ");
        return res.status(500).json({
            message : 'Internal server error '
        })  
    }
    
}

