const user = require('../../../models/user')

module.exports.create_session = (req, res) => {
   
    req.flash('success' , 'logged in succesfully')
 
 
    return res.redirect('/posts/')
 }