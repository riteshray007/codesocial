const mongoose = require('mongoose')
const likeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId
    },
    likeable : {
        type : mongoose.Schema.ObjectId,
        require : true,
        refPath : 'onModel'
    },
    //this field is used to define the type of the liked object since this is a dynamic reference 
    onModel : {
        type  : String,
        required : true,
        enum : ['Post' , 'Comment' ]
    }
} , 
    {timestamps : true} 
)

const Like = mongoose.model( "Like" , likeSchema )

module.exports = Like;

