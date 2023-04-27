class ChatEngine{
    constructor(chatBoxId , userEmail ){
        this.userEmail = userEmail;
        this.chatBox = $(`#${chatBoxId}`);
        // this.socket = io.connect( 'http://13.239.139.155:5000' );
        this.socket = io.connect( 'http://127.0.0.1:5000' );

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

        $('.send-message-container').submit(function(e){
            
            e.preventDefault();
            let form = $('.send-message-container')
            let value = $('.message-form').val();

            if(value != ''){

                $.ajax({
                    type : 'post',
                    url : '/chatbox/create',
                    data : form.serialize(),
                    success : function(data){

                        self.socket.emit( 'send_message' , {
                            message : value,
                            user_email : self.userEmail,
                            time : data.data.timeStamps,
                            chatroom : 'codesocial'
                        } )

                    }
                })
                
            }
            $('.message-form').val('');
            
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


console.log('working as well')

let lis = document.querySelectorAll('.li');

for(let i of lis ){
    console.log(i);
    let height;
    if(i.classList.contains('Other-message')){
        height = i.querySelector('.others-span').offsetHeight;
        $(i).css('height' , height + 'px' );
    }else{
        height = i.querySelector('.self-span').offsetHeight
        $(i).css('height' , height + 'px' );
    }
    console.log(height);
}