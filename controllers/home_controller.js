module.exports.home = function(req , res){
    return res.render('home' , {title : 'home'} )
}



module.exports.about = (req , res)=>{
    return res.end('<h1> abouts controller from home_controller </h1>')
}