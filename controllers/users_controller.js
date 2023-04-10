const user = require('../models/user');
const posts = require('../models/posts');
const Friendship = require('../models/friendship');
const fs = require('fs');
const path = require('path');
const queue = require('../config/kue');
const resetpassEmailWorker = require('../workers/password_reset_worker');
const crypto = require('crypto')
const password = require('../models/forgetpass');

module.exports.removeFriends = async (req , res)=>{

   try{
      let from = req.query.from;
      let to = req.query.to;
   
      let friendship = await Friendship.findOne({ from_user:from , to_user : to })
      console.log(friendship , " - friendship ");
      let fromuser = await user.findById( from );
      let touser = await user.findById(to);
   
      fromuser.friendships.pull(friendship);
      touser.friendships.pull(friendship);
      fromuser.save();
      touser.save();
      friendship.remove();
      req.flash('error' , 'removed from friend' )
      return res.redirect('back')
   }catch(err){
      console.log(err);
   }

}
module.exports.sendfriendrequest = async (req , res )=>{
   let from = req.query.from;
   let to = req.query.to;
   // let friend =  Friendship.find({ from_user : from  , to_user : to })
   try{

      let existfriend = await Friendship.findOne({  from_user : from , to_user : to  })
      // console.log('existfriend - ' , existfriend );
      if(!existfriend){

         let friendship = await Friendship.create({
            from_user : from ,
            to_user : to
         })

         let touser = await user.findById(to);
         let fromuser = await user.findById(from);
         fromuser.friendships.push(friendship);
         touser.friendships.push(friendship);
         fromuser.save();
         touser.save();
         req.flash('success' , 'Added as Friend' )
      }
      
      return res.redirect('back');
   }catch(err){
      console.log(err)
   }

}

module.exports.forget_password = async (req, res) => {

   id = req.query.id;
   let passcode = await password.findOne({ user: id })
   // if(req.body.otp == passcode.accessToken && passcode.validity == true ){
   //    res.render( 'resetpassword' , { id : id }  )
   // }
   // else{
   //    req.flash('error' , 'invalid otp' )
   //    res.redirect('back');
   // }
   if(req.xhr){
      return res.status(200).json({
         data :{
            password : passcode
         },
         message : 'checking '
      })
   }
   return res.render('resetpassword' , {id : id} );
}

module.exports.varifysecuritycode = async (req , res )=>{
   
   let datauser = await user.findOne({ email : req.body.confirmemail })
   if(datauser){
      try {         
         let code = crypto.randomBytes(3).toString('hex')
         let codedata = {
            _id: datauser._id,
            email: datauser.email,
            name: datauser.name,
            code: code,
         }

         var passdata = await password.findOne({ user: datauser._id })

         if (!passdata) {
            passdata = await password.create({
               user: datauser._id,
               accessToken: code,
               validity: true
            })
            jobcaller();
         }
         else if(passdata.validity==false){
            passdata.accessToken = code;
            passdata.validity = true;
            passdata.save();

               jobcaller();

               setTimeout(() => {
                  console.log('timeout completed')
                  passdata.validity = false
                  passdata.save();
               }, 120000 );
         }
         
         function jobcaller(){
            let job = queue.create('resetpassword', codedata).save((err) => {
               if (err) {
                  console.log(' err in creating reset password job  ', err);
                  return;
               }
               console.log(job.id);
            })
         }
        
            
         res.render('confirmsecuritycode' , {user : datauser}  )
      } catch (err) {
         console.log(err);
         return;         
      }
   }else{
      req.flash('error' , 'user not found' )
      res.redirect('back');
   }
}

module.exports.confirmReset = async (req, res) => {

   res.render('confirmreset')

}

module.exports.setnewpassword = async (req, res) => {
   id = req.query.id;
   let userdata = await user.findById(id);
   if (req.body.newpassword == req.body.cnewpassword ) {
      userdata.password = req.body.newpassword;
      userdata.save();
      req.flash("success", ' Password updated successfully ')
      var passdata = await password.findOne({ user: id })
      passdata.validity = false ;
      passdata.save();
   }
   else {
      req.flash('error', "User not found ")
   }
   res.redirect(`/users/profile?id=${req.user._id}`);
}

module.exports.update_profile = async (req, res) => {
   if (req.query.id == req.user.id && req.body.password == req.user.password && req.body.new_password == req.body.cnew_password) {
      try {
         // await user.findByIdAndUpdate( req.query.id , { password : req.body.new_password, name : req.body.name } )
         let profile = await user.findById(req.query.id);
         user.uploadedAvatar(req, res, function (err) {
            if (err) {
               console.log(err);
            }
            console.log(req.file);
            profile.password = req.body.new_password;
            profile.name = req.body.name;
            if (req.file) {
               if (profile.avatar) {
                  if (fs.existsSync(path.join(__dirname, "..", profile.avatar))) {
                     fs.unlink(path.join(__dirname, '..', profile.avatar), (err) => {
                        if (err) {
                           console.log(err);
                        } else {
                           console.log('replace succesfully');
                        }
                     });
                  }
               }
               profile.avatar = user.avatarpath + '/' + req.file.filename;
            }
            req.flash('success', 'profile updated succesfully! ')
            profile.save();
            return res.redirect('back');
         })
      } catch (err) {
         // console.log(err);
         req.flash('error', err);
         return;
      }
   }
   else {
      return res.status(401).send('please check the credentials again');
   }

}

module.exports.profile = async (req, res) => {

   try {
      let data = await user.findById(req.query.id)
      .populate({
         path : 'friendships',
      })

      let postdata = await posts.find({ user: req.query.id })
         .populate('user')
         .populate({
            path: 'comments',
            populate: {
               path: 'user'
            }
         }).populate({
            path : 'likes',
         })

      // return res.status(200).json({
      //    posts : postdata,
      //    user : data
      // })
      return res.render('user_profile', {
         posts: postdata,
        userdata: data
      })
   } catch (err) {
      console.log(err);
      return;
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
   req.logout(function (err) {
      if (err) {
         console.log(err);
      }
      req.flash('error', 'you have logged out!');
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
            req.flash('success', 'new user signedup')
            return res.redirect('/users/signin');
         })
      }
      else {
         req.flash('warning', 'email id u entered already exist!')
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
   req.flash('success', 'logged in succesfully')


   return res.redirect('/posts/')
}
