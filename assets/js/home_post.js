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
                   
                    let newPost = newPostDom(data.data.post);
                    $('.allposts').prepend(newPost);
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        

        // function getst(d) { 
        //         if (d > 3 && d < 21) { return 'th'  
        //        }else if(d%10 == 1) {return 'st'
        //        }else if(d%10 == 2 ) {return 'nd'
        //        }else if(d%10 == 3) {return 'rd'
        //        }else {return 'th'}
        //       }  
        //  let v =  i.updatedAt 
        // let date =  v.getDate() 
        // let st = getst(date) 
        // date = date + st ;

        return $(`
        
        <div id="${post._id}"  class="postbox vcenter" >
        <div class=" userinfo " >
            <span>
                <img src="/images/gamer.png" class="avatar" >
            </span>
            <span>
                <h4 class="username"  > ${post.user.name } </h4>  
               
            </span>
            
                <span class="dropdown" >
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                    <div class="dropdownContents " id='${ post._id }' >
                        <p class="deletepost" > Delete post  </p>
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


    createPost();
}