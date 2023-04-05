const mongoose = require('mongoose')
const likeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.objectId
    },
    likable : {
        type : mongoose.Schema.objectId,
        require : true,
        refpath : 'onModel'
    },
    //this field is used to define the type of the liked object since this is a dynamic reference 
    onModel : {
        type  : String,
        required : true,
        enum : ['post' , 'comment' ]
    }
} , 
    {timestamps : true} 
)

const Like = mongoose.model( "like" , likeSchema )

module.exports = Like