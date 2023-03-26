const User = require('../../../models/user')
const jwt = require('jsonwebtoken')
module.exports.create_session = async (req, res) => {
   
    // req.flash('success' , 'logged in succesfully')
    try{
        let user = await User.findOne({email : req.body.email } );
        if(!user || user.password != req.body.password ){
            return res.status(422).json({
                message : "invalid username or password"
            });
        }
        return res.status(200).json({
            message : 'sign in succesful, here is your token please keep it safe!  ',
            data : {
                token : jwt.sign(user.toJSON() , 'codesocial' , {expiresIn : '1000000'})
            }
        })
    }catch(err){
        console.log('*******' , err);
        return res.status(500).json({
            message : 'internal server error'
        });
    }
  
 
    return res.redirect('/posts/')
 }