module.exports.chatsockets = (socketserver)=>{
 
    let io = require('socket.io')(socketserver , {
        cors : {
            origin : '*'
        }
    } );

    // io.origins('*:*')

    io.sockets.on('connection' , function(socket){
        console.log( ' new connection is establised' , socket.id );

        socket.on('disconnet' , function(){
            conosole.log('socket disconnect');
        } )
        socket.on( 'join_room' , function(data){
            console.log('joining request rec - '  , data );
            socket.join(data.chatroom);
            
            io.in(data.chatroom).emit('user_joined' , data );
        } )
        socket.on('send_message' , function(data){
            console.log(data)
            io.in(data.chatroom ).emit('message_received', data );
        } )
    } )
}