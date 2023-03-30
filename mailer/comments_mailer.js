const nodemailer = require('../config/nodemailer')

 exports.newComment = (comment)=>{
    console.log("inside newcomment mailer ")

    nodemailer.transporter.sendMail({
        from : 'ray.riteshdev007@gmail.com',
        to : comment.user.email,
        subject : 'new comment published',
        html : '<h1> yup, your comment is being published!  </h1>'
    }, (err )=>{
        if(err){
            console.log(err , "in mailer")
            return ;
        }
        console.log('message sent');
        return ;
    })
 }