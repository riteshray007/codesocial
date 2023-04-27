const express = require('express')
const chats = require('../models/chats');

module.exports.allchats = async (req , res )=>{
    let chat = await chats.find({})
    .populate('user');
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
        let chat =  await chats.create({
            user : req.user ,
            message : req.body.message
        })

        if(req.xhr){
            return res.status(200).json({
                data : chat
            })
        }
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
    }
}