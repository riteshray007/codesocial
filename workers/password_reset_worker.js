const queue = require('../config/kue')

const passwordmailer = require('../mailer/resetPassword_mailer');

queue.process( 'resetpassword' , function( job , done ){
    console.log( job.data , 'password worker is processing' )
    passwordmailer.resetPassword(job.data);
    done();
} )