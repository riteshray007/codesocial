const queue = require('../config/kue')

const commentmailer = require('../mailer/comments_mailer')

 queue.process( 'emails' , function(job , done ){
    console.log( job.data , " email worker is proccessing a job " );
    commentmailer.newComment(job.data);
    done(); 
 } )