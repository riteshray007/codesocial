const user = require('../models/user');
module.exports.profile = (req , res )=>{
   return res.end('<h1>welcome to  Users Profile </h1>')
}
module.exports.users = (req , res )=>{
   return res.render('users')
}

module.exports.signup = function(req , res ){
   // console.log(req.cookies);
   // res.cookie('user_id' , 23)
   // console.log(req.body);
   return res.render('user_signup');
}

module.exports.create = function(req , res){
   // console.log(req.body);
   if(req.body.password != req.body.confirmpassword){
      return res.redirect('back');
   }
   user.findOne({email : req.body.email} , (err , data)=>{
      if(err){
         console.log('error while finding email');
         return;
      }      
      if(!data){
            user.create({
               email : req.body.email ,
               password : req.body.password,
               name : req.body.name
            } , (err, data)=>{
               if(err){
                  console.log('error while creating profile')
                  return ;
               }
               return res.render('user_signin');
            })
         }
      else{
            return res.redirect('/users');
         }
      
   } )
   // return res.render('user_signin');
}

module.exports.signin = (req , res)=>{
   return res.render('user_signin');
}