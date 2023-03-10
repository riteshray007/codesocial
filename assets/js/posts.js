const dcontent = document.querySelectorAll('.dropdownContents')


document.addEventListener('click' , (e)=>{
    if(e.target.classList.contains("dropdown")){
        let a = e.target;
        let id = a.querySelector('.dropdownContents').id;
        // console.log(id)
        dcontent.forEach((x)=>{
            if(x.id!=id) x.classList.remove('active');
        })
        a.querySelector('.dropdownContents').classList.toggle('active')
    }
    else{
        document.querySelectorAll('.dropdownContents').forEach((x)=>{
            x.classList.remove('active');
        })
    }
})