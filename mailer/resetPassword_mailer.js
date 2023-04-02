const nodemailer = require('../config/nodemailer')

exports.resetPassword = (token)=>{
    let htmlstring = nodemailer.renderTemplate({token : token} , '/password/resetPassword.ejs' )

    nodemailer.transporter.sendMail({
        from : 'codesocial.in@gmail.com',
        to : token.email,
        subject :' codesocial- password reset OTP',
        html : htmlstring,
    } , (err, info)=>{
        if(err){
            console.log(err);
            return ;
        }
        console.log(info , "message send ");
        return ;
    })


}