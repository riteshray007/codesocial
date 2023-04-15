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
    google_call_back_url : "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'codesocial',

    
}

const production = {
    name : 'production'
}

module.exports = development;