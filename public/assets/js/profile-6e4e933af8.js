let imginput=document.querySelector(".profilepic");document.addEventListener("click",(e=>{e.target.classList.contains("editprofilebutton")?document.querySelector(".editprofilediv").classList.toggle("active"):e.target.closest(".editprofilediv")||document.querySelector(".editprofilediv").classList.remove("active")}));let prediv=$(".previewdiv");function readURL(e){if(console.log("selected some img "),e.files&&e.files[0]){var i=new FileReader;i.onload=function(e){prediv.html('<img src="#"  class="previewpic" >'),prediv.css("display","inline-block"),console.log(e.target.result),$(".previewpic").attr("src",e.target.result)},i.readAsDataURL(e.files[0])}}$(".profilepic").change((function(){readURL(this),console.log(this)}));