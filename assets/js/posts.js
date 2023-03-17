const dcontent = document.querySelectorAll('.dropdownContents')


document.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target.classList.contains("deletepost")) {
        window.location.href = `/posts/delete-post?id=${e.target.parentNode.id}`;
        return;
    }
    else if (e.target.classList.contains("deletecomm")) {
        window.location.href = `/posts/deletecomment?id=${e.target.parentNode.id}`
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
    else if ( e.target.classList.contains('editprofilebutton')  ) {
        document.querySelector('.editprofilediv').classList.toggle('active');
    }
    else if(!e.target.closest('.editprofilediv')){
        document.querySelector('.editprofilediv').classList.remove('active');
    }
    
        document.querySelectorAll('.dropdownContents').forEach((x) => {
            x.classList.remove('active');
        })
})