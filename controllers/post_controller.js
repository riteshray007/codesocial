module.exports.post = (req , res )=>{
    return res.render('posts');
}

module.exports.stats= (req , res)=>{
    return res.end('<h1> welcome to posts stats </h1>')

}