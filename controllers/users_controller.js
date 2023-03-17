const user = require('../models/user');
const posts = require('../models/posts');

module.exports.update_profile = async (req , res )=>{
   try{

      if(req.query.id == req.user.id && req.body.password == req.user.password && req.body.new_password == req.body.cnew_password ){
         await user.findByIdAndUpdate( req.query.id , { password : req.body.new_password, name : req.body.name } )
         req.flash( 'success' , 'profile updated succesfully! ' )
         return res.redirect('back');
      }
      else{
         return res.status(401).send('please the credentials again');
      }
   }catch(err){
      console.log(err);
      return ;
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
      req.flash('success' , 'you have logged out!');
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

// https://codepen.io/ig_design/pen/MWKVrNR