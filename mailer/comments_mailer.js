const nodemailer = require('../config/nodemailer')

 exports.newComment = (comment)=>{
    // console.log("inside newcomment mailer ")
    let htmlstring = nodemailer.renderTemplate({comment : comment} , '/comments/new_comments.ejs' )
    
    nodemailer.transporter.sendMail({
        from : 'codesocial.in@gmail.com',
        to : comment.user.email,
        subject : 'new comment published',
        html :  htmlstring,
    }, (err , info )=>{
        if(err){
            console.log(err , "in mailer")
            return ;
        }
        console.log('message sent' , info );
        return ;
    })
 }