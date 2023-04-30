const express = require('express')
const chats = require('../models/chats');

module.exports.allchats = async (req , res )=>{
    let chat = await chats.find({})
    .select('-password')
    .populate('user' , '-password');
    // return res.status(200).json({
    //     chats : chat
    // })
    return res.render('chatbox' , {chats : chat})
}

module.exports.createmsg = async ( req , res )=>{
    let id = req.user.id
    console.log(id);
    console.log( "body = " ,  req.body.message);

    try{
        var chat =  await chats.create({
            user : req.user ,
            message : req.body.message
        })

        await chat.populate('user')
        console.log(chat);
        
        if(req.xhr){
            return res.status(200).json({
                data : {data : chat,
                        path : req.app.locals.assetPath('images/gamer.png')
                },
                message : "msg received binaya",
            })
        }
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deletemsg = async (req , res)=>{
    let id = req.query.id;
    try{
        await chats.findByIdAndDelete(id);
        return res.redirect('back')

    }catch(err){
        console.log(err);
    }
}
