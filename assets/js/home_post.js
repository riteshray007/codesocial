{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#create-post');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create_post',
                data: newPostForm.serialize(),
                success: function(data){
                   console.log(data.data.post)
                    let newPost = newPostDom(data.data.post);
                    $('.allposts').prepend(newPost);
                    
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
                                <p class="deletepost" data-href ="/posts/delete-post?id=${post._id}" > Delete post  </p>
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
                        <button class="commentbutton" > Add Comment </button>
                    </form>                    
                </div>

            </div>
        `)
    }
    
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).attr('data-href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
}


$('body').click(function(e){
    console.log(e.target);
})