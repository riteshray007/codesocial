const user = require('../models/user');
const posts = require('../models/posts');
const fs = require('fs');
const path = require('path');

module.exports.update_profile = async (req , res )=>{
   if(req.query.id == req.user.id  && req.body.new_password == req.body.cnew_password ){
   try{
         // await user.findByIdAndUpdate( req.query.id , { password : req.body.new_password, name : req.body.name } )
         let profile = await user.findById(req.query.id);
         user.uploadedAvatar(req , res , function(err){
            if(err){
               console.log(err);
            }
            console.log(req.file);
            profile.password = req.body.new_password;
            profile.name = req.body.name;
            if(req.file){
               if(profile.avatar){
                  if(fs.existsSync(path.join( __dirname , ".." , profile.avatar ))){
                     fs.unlink( path.join( __dirname , '..' , profile.avatar )  , (err)=>{
                        if(err){
                           console.log(err);
                        }else{
                           console.log('replace succesfully');
                        }
                     });
                  }
               }
               profile.avatar = user.avatarpath + '/' + req.file.filename ; 
            }
            req.flash( 'success' , 'profile updated succesfully! ' )
            profile.save();   
            return res.redirect('back');
         })
      }catch(err){
         // console.log(err);
         req.flash('error' , err);
         return ;
      }
   }
   else{
      return res.status(401).send('please check the credentials again');
   }

}

module.exports.profile = async (req, res) => {

   try{
      let data = await user.findById(req.query.id);

      let postdata = await posts.find({user : req.query.id})
      .populate('user')
      .populate({
         path : 'comments',
         populate : {
            path : 'user'
         }
      })

      return res.render( 'user_profile' , {
         posts : postdata , 
         userdata : data
      } )
   }catch(err){
      console.log(err);
      return ;
   }
}
module.exports.users = (req, res) => {
   return res.render('users')
}

module.exports.signup = function (req, res) {
   if (req.isAuthenticated()) {
      return res.redirect('/posts/');
   }
   else {
      return res.render('user_signup');
   }
}

module.exports.signout = (req, res) => {
   // console.log(req.cookies.user_id);
   // res.cookie('user_id', '');
   req.logout( function(err){
      if(err){
         console.log(err);
      }
      req.flash('error' , 'you have logged out!');
      return res.redirect('/users')
   });
}

module.exports.create = function (req, res) {
   // console.log(req.body);
   if (req.body.password != req.body.confirmpassword) {
      return res.redirect('back');
   }
   user.findOne({ email: req.body.email }, (err, data) => {
      if (err) {
         console.log('error while finding email');
         return;
      }
      if (!data) {
         user.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
         }, (err, data) => {
            if (err) {
               console.log('error while creating profile')
               return;
            }
            req.flash('success' , 'new user signedup' )
            return res.redirect('/users/signin');
         })
      }
      else {
         req.flash('warning' , 'email id u entered already exist!' )
         return res.redirect('/users/signup');
      }

   })

}

module.exports.signin = (req, res) => {
   if (req.isAuthenticated()) {
      return res.redirect('/posts/');
   }
   else {
      return res.render('user_signin');
   }
}



module.exports.create_session = (req, res) => {
   // console.log(req.body);
   // user.findOne({ email: req.body.email }, (err, data) => {
   //    if (err) {
   //       console.log("error while searching for email")
   //       return;
   //    }
   //    else {
   //       // console.log(data);
   //       if (data.email === req.body.email && data.password === req.body.password) {
   //          res.cookie('user_id ', data._id);

   //          return res.redirect('/users/profile');
   //       }
   //       else {
   //          return res.redirect('back');
   //       }
   //    }
   // })
   req.flash('success' , 'logged in succesfully')


   return res.redirect('/posts/')
}
