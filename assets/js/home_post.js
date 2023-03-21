{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#create-post');

        
        
        $('.deletepost').click((e)=>{
            // let pid = e.target.attr('id');
            let par = $(e.target).parent();
            // console.log(par);
            // console.log($('.deletepost' , par))
            deletePost($('.deletepost',par));
            // deletePost(e.target);
        })
        
 
// trigger an artificial click event

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create_post',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data.data.post);
                    let newPost = newPostDom(data.data.post);
                    $('.allposts').prepend(newPost);
                    // console.log(newPost)
                    $('.deletepost' , newPost).click(()=>{  
                        deletePost('.deletepost' , newPost);
                    })
                    // console.log($('.deletepost',newPost))
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
            $('#contentinput').val('');
        });
    }

    // method to create a post in DOM
    let newPostDom = function(post){
        
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
        
                
        return $(`
        
            <div id="post-${post._id}"  class="postbox vcenter" >
                <div class=" userinfo " >
                    <span>
                        <img src="/images/gamer.png" class="avatar" >
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
                
                <p class="contentbox" > ${ post.content }</p>

                <div class="likescomments" >
                    <span class="likes" > <i class="fa-regular fa-heart"></i>  like </span>
                    <span class="comments" >  <i class="fa-regular fa-comment"></i> comments  </span>
                </div>

                <div class="commentbox" >
                    <form action="/posts/create_comment/?id=${post._id}" method="post" >
                        <textarea required name="content"  spellcheck="false" placeholder="Type here ... " adjust ></textarea>
                        <button type='submit' class="commentbutton" > Add Comment </button>
                    </form>                    
                </div>

            </div>
        `)
    }

    function commentformat(data){
        
            let time = new Date(data.updatedAt);

        return $(`
                <div class="comment" >
                <span class="imgspan" >
                    <img src="/images/gamer.png" class="comm_avatar" >
                </span>
                
                <span class="name_com" >
                    <span>
                    <p class="username" > ${ data.user.name } </p>
                        <p class="commenttime" >${ time.toLocaleTimeString([] , {  hour: '2-digit' , minute: '2-digit' }) }</p>
                    </span>
                    <p>${ data.content } </p>
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
    
    let deletePost = function(deleteLink){
        
            // $(deleteLink).click((e)=>{

                // e.preventDefault();
                $.ajax({
                    type: 'get',
                    url: `/posts/delete-post?id=${$(deleteLink).attr('data-href')}`,
                    success: function(data){
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
        console.log(par)
        console.log($(par).attr('action'))
        $.ajax({
            type : 'post',
            url : `${$(par).attr('action')}`,
            data : $(par).serialize(),
            success : (data)=>{
                // console.log(data.data.comment)
                let curcomment = commentformat(data.data.comment)
                // console.log(curcomment.html());
                // console.log($(`#post-${data.data.comment.post} .commentlist`).html())
                $(`#post-${data.data.comment.post} .commentlist`).prepend(curcomment);
            }, error : (err)=>{
                console.log(err.responseText);
            }
        })
    })

    createPost();
}
