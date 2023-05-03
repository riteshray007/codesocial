
{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#create-post');

        
        
        $('.deletepost').click((e)=>{
            // let pid = e.target.attr('id');
            let par = $(e.target).parent();
            deletePost($('.deletepost',par));
            // deletePost(e.target);
        })
        $('.liketoggle').click((e)=>{
            e.preventDefault();
            // let link = anchortag;
            togglelikefnc( $(e.target) )
        })
        
 
    // trigger an artificial click event


        newPostForm.submit(function(e){
            e.preventDefault();
            var data = new FormData(this);
            $.ajax({
                type: 'post',
                url: '/posts/create_post',
                data: data ,
                cache : false,
                contentType : false,
                processData : false,
                success: function(data){
                    // console.log(data.data.post);
                    let newPost = newPostDom(data.data.post , data.data.path );
                    
                    $('.allposts').prepend(newPost);
                    // console.log(newPost)
                    $('.deletepost' , newPost).click(()=>{  
                        deletePost('.deletepost' , newPost);
                    })
                    $('.liketoggle' , newPost).click((e)=>{
                        e.preventDefault();
                        console.log($(e.target).attr('href'));
                        // let link = anchortag;
                        togglelikefnc( $(e.target) )
                    })
                    // console.log($('.deletepost',newPost))
                    notysucess('Post Published!')
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
            $('#contentinput').val('');
        });
    }

    // method to create a post in DOM
    let newPostDom = function(post , path ){
        
        function getst(d) { 
            if (d > 3 && d < 21) { return 'th'   
           }else if(d%10 == 1) {return 'st' 
           }else if(d%10 == 2 ) {return 'nd' 
           }else if(d%10 == 3) {return 'rd' 
           }else {return 'th' 
          }  }       
            let i = new Date(post.updatedAt);
             let date =  i.getDate()
             let st = getst(date)
             date = date + st ;
        
                
        let body =  $(`
        
            <div id="post-${post._id}"  class="postbox vcenter" >
                <div class=" userinfo " >
                    <span class=" imgspan " >
                        <img src="${ post.user.avatar ? post.user.avatar :  path}" class="avatar" >
                    </span>
                    <span>
                        <h4 class="username"  > ${post.user.name } </h4> 
                        <span class="posttime" > ${ date  + " " + i.toLocaleTimeString([] , { month: 'long', hour: '2-digit' , minute: '2-digit' , hour12 : true })  } </span>
                    </span>                    
                    <span class="dropdown" >
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            <div class="dropdownContents " id='${ post._id }' >
                                <p class="deletepost" data-href ="${post._id}" > Delete post  </p>
                                <p class="editpost" > Edit post  </p>
                            </div>
                    </span>                
                </div>                
                
                <div class="contentbox" >                 
                   <p class="textcontent" > ${ post.content }</p>
                </div>

                <div class="likescomments" >
                    <a  class="liketoggle" href="/likes/toggle?id=${post._id}&type=Post" >  <i class="fa-regular fa-heart"></i> <span class="likes" >  </span> </a>
                    <span class="comments" >  <i class="fa-regular fa-comment"></i> comments  </span>
                </div>

                <div class="commentbox" >
                    <form action="/posts/create_comment/?id=${post._id}" method="post" >
                        <textarea required  class="commentarea"  name="content"  spellcheck="false" placeholder="Type here ... " adjust ></textarea>
                        <button type='submit' class="commentbutton" > Add Comment </button>
                    </form>                    
                </div>

            </div>
        `)

        if(post.image){
            let tar = $('.textcontent' , body )
            $(`<img src="${post.image}" class="postimage" >`).insertBefore(tar) ;
        }

        return body;
    }

    function commentformat(data  , path ){
        
            let time = new Date(data.updatedAt);

        return $(`
                    <div class="comment" id="comment-${data._id}" >

                        <span class="imgspan" >
                        <img src="${ data.user.avatar ? data.user.avatar : path}" class="avatar" >
                        </span>
                        
                        <span class="name_com" >
                            <span>
                            <p class="username" > ${ data.user.name } </p>
                                <p class="commenttime" >${ time.toLocaleTimeString([] , {  hour: '2-digit' , minute: '2-digit' }) }</p>
                            </span>
                            <p>${ data.content } </p>
                            <a class="liketoggle"  href="/likes/toggle?id=${data._id}&type=Comment" >
                    
                                <i class="fa-regular fa-heart"></i>
                                <span class="likes" > 0  </span> 
                            </a>

                        </span>

                        <span class="dropdown"  >
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            <div class="dropdownContents " id='${ data._id }' >
                                <p class="deletecomm" > Delete comment </p>
                                
                                <p class="editcomm" > Edit comment </p>
                                
                            </div>
                        </span>

                    </div>

        `)
    }

    function togglelikefnc(anchortag){
        let link = anchortag.attr('href');
        // console.log(link);
        $.ajax({
            type : 'POST',
            url : link,
            success: function(data){
                // console.log(data.data.deleted);
                if(!data.data.deleted){
                    $( '.fa-heart' , anchortag ).addClass('fa-solid');
                    $( '.fa-heart' , anchortag ).removeClass('fa-regular');
                    let val = $( '.likes' , anchortag ).html();
                    $( '.likes' , anchortag ).html( +val+1 )
                    
                }
                else{
                    
                    $( '.fa-heart' , anchortag ).addClass('fa-regular');
                    $( '.fa-heart' , anchortag ).removeClass('fa-solid');
                    let val = $( '.likes' , anchortag ).html();
                    $( '.likes' , anchortag ).html( +val-1 )
                }                
            },error : function(error){
                console.log(error.responseText);
            }

        })
    }
    
    let deletePost = function(deleteLink){
        
            // $(deleteLink).click((e)=>{

                // e.preventDefault();
                $.ajax({
                    type: 'get',
                    url: `/posts/delete-post?id=${$(deleteLink).attr('data-href')}`,
                    success: function(data){
                        notyerror('Post Removed !')
                        $(`#post-${data.data.post_id}`).remove();
                    },error: function(error){
                        console.log(error.responseText);
                    }
                });
            // })
        
    }

    $('.commentbutton').click((e)=>{
        e.preventDefault();
        let par = $(e.target).parent();
        // console.log(par)
        // console.log($(par).attr('action'))
        $.ajax({
            type : 'post',
            url : `${$(par).attr('action')}`,
            data : $(par).serialize(),
            success : (data)=>{
                // console.log(data.data.comment)
                let curcomment = commentformat(data.data.comment , data.data.path )
                // console.log(curcomment.html());
                $('.deletecomm' , curcomment).click((e)=>{
                    deletecomment(`${data.data.comment._id}`);
                })
                $('.liketoggle' , curcomment).click((e)=>{
                    e.preventDefault();
                    console.log($(e.target).attr('href'));
                    // let link = anchortag;
                    togglelikefnc( $(e.target) )
                })
                // console.log($(`#post-${data.data.comment.post} .commentlist`).html())
                $(`#post-${data.data.comment.post} .commentlist`).prepend(curcomment);
                $( par ).children('.commentarea').val("");
                notysucess('Comment Posted!')
            }, error : (err)=>{
                console.log(err.responseText);
            }
        })
    })

    $('.dropdownContents').click((e)=>{
        deletecomment($(e.target).parent().attr('id'));
    })

    function  deletecomment(id){
        // console.log(id);
        $.ajax({
            type :'get',
            url : `/posts/deletecomment?id=${id}`,
            success : (data)=>{
                $(`#comment-${data.data.comm}`).remove();
                notyerror('Comment Deleted!');
            },error:(err)=>{
                console.log(err.responseText);
            }
        })
    }

    createPost();


    function notysucess(massage){
        new Noty({
            theme : 'metroui',
            text : `${massage}`,
            type : 'success',
            timeout : 1500 , 
            layout : "topRight",
            progressBar : true ,
            closeWith : ['click'],
            animation: {
                open: function (promise) {
                    var n = this;
                    var Timeline = new mojs.Timeline();
                    var body = new mojs.Html({
                        el        : n.barDom,
                        x         : {500: 0, delay: 0, duration: 500, easing: 'elastic.out'},
                        isForce3d : true,
                        onComplete: function () {
                            promise(function(resolve) {
                                resolve();
                            })
                        }
                    });
    
                    var parent = new mojs.Shape({
                        parent: n.barDom,
                        width      : 200,
                        height     : n.barDom.getBoundingClientRect().height,
                        radius     : 0,
                        x          : {[150]: -150},
                        duration   : 1.2 * 500,
                        isShowStart: true
                    });
    
                    n.barDom.style['overflow'] = 'visible';
                    parent.el.style['overflow'] = 'hidden';
    
                    var burst = new mojs.Burst({
                        parent  : parent.el,
                        count   : 10,
                        top     : n.barDom.getBoundingClientRect().height + 75,
                        degree  : 90,
                        radius  : 75,
                        angle   : {[-90]: 40},
                        children: {
                            fill     : '#EBD761',
                            delay    : 'stagger(500, -50)',
                            radius   : 'rand(8, 25)',
                            direction: -1,
                            isSwirl  : true
                        }
                    });
    
                    var fadeBurst = new mojs.Burst({
                        parent  : parent.el,
                        count   : 2,
                        degree  : 0,
                        angle   : 75,
                        radius  : {0: 100},
                        top     : '90%',
                        children: {
                            fill     : '#EBD761',
                            pathScale: [.65, 1],
                            radius   : 'rand(12, 15)',
                            direction: [-1, 1],
                            delay    : .8 * 500,
                            isSwirl  : true
                        }
                    });
    
                    Timeline.add(body, burst, fadeBurst, parent);
                    Timeline.play();
                },
                close: function (promise) {
                    var n = this;
                    new mojs.Html({
                        el        : n.barDom,
                        x         : {0: 500, delay: 10, duration: 500, easing: 'cubic.out'},
                        skewY     : {0: 10, delay: 10, duration: 500, easing: 'cubic.out'},
                        isForce3d : true,
                        onComplete: function () {
                            promise(function(resolve) {
                                resolve();
                            })
                        }
                    }).play();
                }
            }
        }).show();
    }

    function notyerror(massage){
        new Noty({
            theme : 'metroui',
            text : `${massage}`,
            type : 'error',
            timeout : 1500 , 
            layout : "topRight",
            animation: {
                open: function (promise) {
                    var n = this;
                    var Timeline = new mojs.Timeline();
                    var body = new mojs.Html({
                        el        : n.barDom,
                        x         : {500: 0, delay: 0, duration: 500, easing: 'elastic.out'},
                        isForce3d : true,
                        onComplete: function () {
                            promise(function(resolve) {
                                resolve();
                            })
                        }
                    });
    
                    var parent = new mojs.Shape({
                        parent: n.barDom,
                        width      : 200,
                        height     : n.barDom.getBoundingClientRect().height,
                        radius     : 0,
                        x          : {[150]: -150},
                        duration   : 1.2 * 500,
                        isShowStart: true
                    });
    
                    n.barDom.style['overflow'] = 'visible';
                    parent.el.style['overflow'] = 'hidden';
    
                    var burst = new mojs.Burst({
                        parent  : parent.el,
                        count   : 10,
                        top     : n.barDom.getBoundingClientRect().height + 75,
                        degree  : 90,
                        radius  : 75,
                        angle   : {[-90]: 40},
                        children: {
                            fill     : '#EBD761',
                            delay    : 'stagger(500, -50)',
                            radius   : 'rand(8, 25)',
                            direction: -1,
                            isSwirl  : true
                        }
                    });
    
                    var fadeBurst = new mojs.Burst({
                        parent  : parent.el,
                        count   : 2,
                        degree  : 0,
                        angle   : 75,
                        radius  : {0: 100},
                        top     : '90%',
                        children: {
                            fill     : '#EBD761',
                            pathScale: [.65, 1],
                            radius   : 'rand(12, 15)',
                            direction: [-1, 1],
                            delay    : .8 * 500,
                            isSwirl  : true
                        }
                    });
    
                    Timeline.add(body, burst, fadeBurst, parent);
                    Timeline.play();
                },
                close: function (promise) {
                    var n = this;
                    new mojs.Html({
                        el        : n.barDom,
                        x         : {0: 500, delay: 10, duration: 500, easing: 'cubic.out'},
                        skewY     : {0: 10, delay: 10, duration: 500, easing: 'cubic.out'},
                        isForce3d : true,
                        onComplete: function () {
                            promise(function(resolve) {
                                resolve();
                            })
                        }
                    }).play();
                }
            }
        }).show();
    }


}
