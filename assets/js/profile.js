document.addEventListener('click' , (e)=>{
    if(e.target.classList.contains('editprofilebutton')){
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