// const { assets_path } = require("../../config/environment");

class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.userEmail = userEmail;
        this.chatBox = $(`#${chatBoxId}`);
        // this.socket = io.connect( 'http://13.239.139.155:5000' );
        this.socket = io.connect('http://127.0.0.1:5000');
        if (this.userEmail) {
            this.connectionHandler();
        }
    }
    
    connectionHandler() {
        // console.log('inside ');
        let self = this;

        this.socket.on('connect', function () {
            console.log("connection establised using sockets")

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codesocial'
            })

            self.socket.on('user_joined', function (data) {
                console.log('a user joined ', data);
            })

        })

        $('.send-message-container').submit(function (e) {

            e.preventDefault();
            let form = $('.send-message-container')
            let value = $('.message-form').val();

            if (value != '') {

                $.ajax({
                    type: 'post',
                    url: '/chatbox/create',
                    data: form.serialize(),
                    success: function (data) {

                        let msgData = {
                            chatroom: 'codesocial',
                            chat: data.data.data,
                            path: data.data.path
                        }
                        console.log('send_message working', msgData);


                        self.socket.emit('send_message', msgData);


                    }
                })

            }
            $('.message-form').val('');

        })

        self.socket.on('deleteTheMsg', function (id) {
            id = `msg-${id}`;
            $(`#${id}`).remove();
        })

        self.socket.on('message_received', function (data) {
            // console.log( 'message received- ' ,  data);
            let messageclass = 'Other-message'
            let time = new Date();
            let option = { hour: 'numeric', minute: 'numeric' }
            let modify = time.toLocaleTimeString("default", option);
            let name = data.chat.user.name.split(" ");
            name = name[0];
            let id = `msg-${data.chat._id}`;
            let ID = `${data.chat._id}`;


            if (data.chat.user.email == self.userEmail) {
                messageclass = 'self-message'
            }
            if (messageclass == 'self-message') {

                $('.message-list').append(` 
                    <li id="${id}" class='li self-message' > <span class='self-span' > ${data.chat.message}  <p class="msgtime" > ${modify} </p>  <i class="fa-solid fa-ellipsis-vertical"></i> 
                    <div class="msgoption  " >
                        <p id="d-${ID}" class="options delete" > Delete Message </p>
                    </div>
                    </span>
                    <div class="avatar_name" > <img class="chatavatar" src="${data.chat.user.avatar ? data.chat.user.avatar : data.path}" > <p class="msgusername"> ${name} </p> </div>
                    </li>
                `)
                let i = document.querySelector(`#${id}`);
                let tar = i.querySelector(`#d-${ID}`)
                console.log('tar -', tar);
                ID = tar.id;
                tar.addEventListener('click', () => {
                    msgdeleter(i, `${ID}`);
                })
            }
            else {
                $('.message-list').append(` 
                <li  id="${id}" class=' li Other-message' >
                <div class="avatar_name" > <img class="chatavatar" src="${data.chat.user.avatar ? data.chat.user.avatar : data.path}" > <p class="msgusername" > ${name} </p>  </div>
                 <span class='others-span' > ${data.chat.message} <p class="msgtime" > ${modify} </p>  </span>   </li>
                `)
            }
            let i = document.querySelector(`#${id}`);
            heightadjuster(i);
            getbottom();


        })


        document.querySelectorAll('.delete').forEach((e) => {
            let target = e.closest('.self-message')
            // console.log(e.id);
            e.addEventListener('click', () => { msgdeleter(target, e.id) })
        })
        function msgdeleter(target, id) {
            target.remove();
            id = id.split("-");
            id = id[1];
            let data = {
                chatroom: 'codesocial',
                id: id
            }
            $.ajax({
                type: 'get',
                url: `/chatbox/delete?id=${id}`,
                success: function () {
                    console.log('msg deleted');
                    self.socket.emit('delete_msg', data);
                }
            })
        }
        

        $(window).resize(function(){
            let lis = document.querySelectorAll('.li');
            for (let i of lis) {
                heightadjuster(i);
            }
        })
            let lis = document.querySelectorAll('.li');
            for (let i of lis) {
                heightadjuster(i);
            }

            getbottom();

            function heightadjuster(i) {
                let height;
                if (i.classList.contains('Other-message')) {
                    height = i.querySelector('.others-span').offsetHeight;
                    $(i).css('height', height + 'px');
                } else {
                    height = i.querySelector('.self-span').offsetHeight
                    $(i).css('height', height + 'px');
                }
            }

            function getbottom(){
                let ul = document.querySelector('ul'); 
                ul.scrollTop = ul.scrollHeight;
            }

    }
}



document.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-ellipsis-vertical')) {
        // console.log(e.target.nextElementSibling);
        e.target.nextElementSibling.classList.toggle('active');
    }
    else {
        document.querySelectorAll('.msgoption').forEach((x) => {
            x.classList.remove('active');
        })
    }
})






