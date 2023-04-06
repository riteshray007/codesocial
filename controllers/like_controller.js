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
            likeable.likes.pull(existLike._id)
            existLike.remove();
            likeable.save();
            deleted = true;
        }
        else{
            let newLike = Like.create({
                user : req.user._id,
                onModel : req.query.type,
                likeable : req.query.id    
            })
            likeable.likes.push(newLike._id);
            likeable.save();            
        }

        res.status(200).json({
            message : ' request succesfully  ',
            data : {
                deleted : deleted
            }
        })





    }catch(err){
        console.log(err , " from toggle likes- ");
        return res.status(500).json({
            message : 'Internal server error '
        })  
    }
    
}

