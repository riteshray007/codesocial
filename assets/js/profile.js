let imginput = document.querySelector('.profilepic');
document.addEventListener('click' , (e)=>{
    if(e.target.classList.contains('editprofilebutton') ){
        document.querySelector('.editprofilediv').classList.toggle('active');
        return ;
    }
    else if(e.target.closest('.editprofilediv')){
        return ;
        // document.querySelector('.editprofilediv').classList.remove('active');
    }
    else{
        document.querySelector('.editprofilediv').classList.remove('active');
    }
})


// imginput.addEventListener('change' , fetchimg )

// function fetchimg(){
//     let file = imginput.files[0];
//     if(file){
//         // const filereader = new filereader();
//         // filereader.readAsDataUrl(file); 
//         // filereader.addEventListener( 'load' , ()=>{
//         //     document.querySelector('.previewdiv').style.display = 'block';
//         //     document.querySelector('.previewdiv').innerHTML = ` <img class="previewimg" src='${this.result}' > `
//         // } )
//         console.log('something ');
//     }
// }

let prediv = $('.previewdiv')
function readURL(input) {
    console.log("selected some img ");
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            prediv.html('<img src="#"  class="previewpic" >')
            prediv.css('display' , 'inline-block');
            $('.previewpic').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$(".profilepic").change(function(){
    readURL(this);
});






