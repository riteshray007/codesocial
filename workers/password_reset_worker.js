const queue = require('../config/kue')

const passwordmailer = require('../mailer/resetPassword_mailer');

queue.process( 'resetpassword' , function( job , done ){
    // console.log( job.data , 'password worker is processing' )
    // console.log("from workers password reset worker job - " ,  job.data)
    passwordmailer.resetPassword(job.data);
    done();
} )





