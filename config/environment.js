const fs = require('fs');
const rfs = require('rotating-file-stream'); 
const path = require('path');

const logDirectory = path.join(__dirname , '../production_logs' );
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access-log' , {
    interval : '1d',
    path : logDirectory
} )

const development = {
    name : 'development',
    assets_path : '/assets',
    session_cookie_key : 'youcantakeanything',
    db : 'codesocial_devlopment',
    smtp : {
        service : 'gmail',
        host : 'smtp.gmail.com',
        port : '587',
        secure : false ,
        auth  : {
            user : 'codesocial.in',
            pass : 'nnhhecmbuqdvitdj'
        }
    
    },
    google_client_id : "23546391621-7qsau9195su6s4qaigihbfq1pcf3jo8s.apps.googleusercontent.com",
    google_client_secret : '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',
    google_call_back_url : "http://3.25.113.39:8000/users/auth/google/callback",
    jwt_secret : 'codesocial',
    morgan : {
        mode : 'dev',
        options : {stream : accessLogStream }
    }

    
}

const production = {
    name : 'production',
    assets_path :  process.env.CODESOCIAL_ASSET_PATH ,
    session_cookie_key : process.env.CODESOCIAL_SESSION_COOKIE_KEY,
    db : process.env.CODESOCIAL_DB,
    smtp : {
        service : 'gmail',
        host : 'smtp.gmail.com',
        port : '587',
        secure : false ,
        auth  : {
            user : process.env.CODESOCIAL_GMAIL_USER,
            pass : process.env.CODESOCIAL_GMAIL_PASS
        }
    
    },
    google_client_id : process.env.CODESOCIAL_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.CODESOCIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url : process.env.CODESOCIAL_GOOGLE_CALL_BACK_URL,
    jwt_secret : process.env.CODESOCIAL_JWT_SECRET,
    morgan : {
        mode : 'combined',
        options : {stream : accessLogStream }
    }

}

// module.exports = eval( process.env.CODESOCIAL_ENVIRONMENT) == undefined ? development : eval( process.env.CODESOCIAL_ENVIRONMENT )  ;
module.exports = development ;
