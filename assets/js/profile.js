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


imginput.addEventListener('change' , fetchimg )

function fetchimg(){
    let file = imginput.files[0];
    if(file){
        const filereader = new filereader();
        filereader.readAsDataUrl(file); 
        filereader.addEventListener( 'load' , ()=>{
            document.querySelector('.previewdiv').style.display = 'block';
            document.querySelector('.previewdiv').innerHTML = ` <img class="previewimg" src='${this.result}' > `
        } )
    }
}






