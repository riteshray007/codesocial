class ChatEngine{
    constructor(chatBoxId , userEmail ){
        this.userEmail = userEmail;
        this.chatBox = $(`#${chatBoxId}`);
        this.socket = io.connect( 'http://13.239.139.155:5000' );

        if(this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self = this;
 
        this.socket.on('connect' , function(){
            console.log("connection establised using sockets")
        
            self.socket.emit('join_room' , {
                user_email : self.userEmail,
                chatroom : 'codesocial'
            } )

            self.socket.on('user_joined' , function(data){
                console.log('a user joined ' , data );
            } )
        
        } )

        $('.message-sending-btn').click(function(){
            let value = $('.message-form').val();

            if(value != ''){
                self.socket.emit( 'send_message' , {
                    message : value,
                    user_email : self.userEmail,
                    chatroom : 'codesocial'
                } )
            }

        })

        self.socket.on('message_received' , function(data){
            console.log(data);
            let messageclass = 'Other-message'
            if(data.user_email == self.userEmail){
                messageclass = 'self-message'
            }
            if(messageclass == 'self-message'){

                $('.message-list').append(` 
                    <li class='self-message' > <span class='self-span' > ${data.message}  <sub> ${data.user_email} <sub/>   </span>  </li>
                `)
            }
            else{

                $('.message-list').append(` 
                <li class='Other-message' > <span class='others-span' > ${data.message} <sub> ${data.user_email} <sub/>  </span>   </li>
                `)
            }

        } )
    }

}