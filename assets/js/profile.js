let imginput = document.querySelector('.profilepic');
document.addEventListener('click' , (e)=>{
    if(e.target.classList.contains('editprofilebutton' )  ){
        // console.log(e.target);
        document.querySelector('.editprofilediv').classList.toggle('active');
        return ;
    }
    else if(e.target.closest('.editprofilediv'  ) ){
        // console.log(e.target);
        return ;
    }
    else{   
        document.querySelector('.editprofilediv').classList.remove('active');
    }
})




let prediv = $('.previewdiv')
function readURL(input) {
    console.log("selected some img ");
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            prediv.html('<img src="#"  class="previewpic" >')
            prediv.css('display' , 'inline-block');
            console.log(e.target.result);
            $('.previewpic').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$(".profilepic").change(function(){
    readURL(this);
    console.log(this);
});






