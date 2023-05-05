const dcontent = document.querySelectorAll('.dropdownContents')


document.addEventListener('click', (e) => {
    // console.log(e.target);
    if (e.target.classList.contains("deletepost")) {
        // window.location.href = `/posts/delete-post?id=${e.target.parentNode.id}`;
        return;
    }
    else if (e.target.classList.contains("deletecomm")) {
        // window.location.href = `/posts/deletecomment?id=${e.target.parentNode.id}`
        return;
    }
    else if (e.target.classList.contains('person')) {
        window.location.href = `/users/profile?id=${e.target.id}`
        return;
    }
    else if (e.target.classList.contains("dropdown")) {

        let a = e.target;
        let id = a.querySelector('.dropdownContents').id;

        dcontent.forEach((x) => {
            if (x.id != id) x.classList.remove('active');
        })

        a.querySelector('.dropdownContents').classList.toggle('active')
        return;
    }
    else{
        document.querySelectorAll('.dropdownContents').forEach((x) => {
            x.classList.remove('active');
        })
    }
})


let prediv = $('.previewimgdiv')
function readURL(input) {
    // console.log("selected some img ");
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        // reader.
        reader.onload = function (e) {
            prediv.html('<img src="#"  class="pic vcenter" >')
            prediv.css('display' , 'inline-block');
            // console.log(e.target.result);
            $('.pic').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#file").change(function(){
    readURL(this);
    console.log(this);
});