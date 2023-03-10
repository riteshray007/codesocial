const user = require('../models/user');
const posts = require('../models/posts');

module.exports.profile = (req, res) => {
   // if (req.cookies.user_id) {
   //    user.findOne({ _id: req.cookies.user_id }, (err, data) => {
   //       if (err) {
   //          console.log("error in finding the user")
   //          return
   //       }
   //       else if (data) {
   //          return res.render('user_profile', { user: data })
   //       }
   //       else {

   //          return res.redirect('/users/signin');
   //       }

   //    })
   // } else {
   //    return res.redirect('/users/signin');
   // }

   user.findById( req.query.id , (err , data)=>{
      if(err){
         console.log(err);
      }
      posts.find({user : req.query.id})
      .populate('user')
      .populate({
         path : 'comments',
         populate : {
            path : 'user'
         }
      }).exec((err , post)=>{
         if(err){
            console.log(err);
         }
         return res.render('user_profile' ,{
            posts : post,
            userdata : data
         })
      })
   })
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
   });
   return res.redirect('/users')
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
            return res.redirect('/posts/');
         })
      }
      else {
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
   return res.redirect('/posts/')
}

// https://codepen.io/ig_design/pen/MWKVrNR