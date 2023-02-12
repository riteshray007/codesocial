module.exports.profile = function(req , res ){
   return res.render('users');
}
module.exports.users = (req , res )=>{
   return res.end('<h1> Users from user.js </h1>')
}