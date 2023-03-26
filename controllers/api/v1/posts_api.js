const user = require('../../../models/user')
const post =  require('../../../models/posts');
const comments = require('../../../models/comments');


module.exports.index = async (req , res)=>{

    try{
        let userdata = await user.find({})        
        let postd = await post.find({})
        .sort('-createdAt')
        .populate({

            path : 'user',
            select : ('-password  '  )
        })
        .populate({
            path : 'comments',
             options : {
                sort : { 'createdAt' : '-1' }
            },  
            populate : {
                path : 'user',
                select : ('-password' )
            }
        })        
        return res.status(200).json({
            posts : postd,
            users : userdata
        })
        
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message : "internal error"
        }) ;
    }
}


module.exports.deletePost = async (req , res)=>{

    try{
        let data = await post.findById( req.params.id )

        if(data.user == req.user.id ){

            
            await comments.deleteMany({post : req.params.id})
            data.remove();
            
            return res.status(200).json({
                message : "post and its associated comments deleted ",
            })
        }else{
            return res.status(401).json({
                message : 'u cant delete this post ',
            })
        }

    }catch(err){
        console.log(err)
        return 
    }
}