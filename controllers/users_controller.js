module.exports.profile = (req , res )=>{
   return res.end('<h1>welcome to  Users Profile </h1>')
}
module.exports.users = (req , res )=>{
   return res.render('users')
}