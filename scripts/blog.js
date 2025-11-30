const gridItem = document.querySelectorAll(".grid-item");
const handleBlogRedirect = (id)=>{
    localStorage.setItem("blogId", id)
    window.location.href="/blog-details.html"
}

async function getData (){
try{

const res = await fetch('assets/blog/blog.json', {method:"GET"})
const data = await res.json();


gridItem.forEach((e, index)=>{
    e.innerHTML =`
    <div class="group bg-center cursor-pointer relative overflow-hidden place-content-end pb-2 bg-cover bg-no-repeat w-full h-full rounded-3xl" onclick="handleBlogRedirect(${data.posts[index].id})">
  <div class="duration-500 group-hover:scale-200 group-hover:brightness-50 transition bg-[url(${data.posts[index].image})] bg-center z-1 bg-cover bg-no-repeat w-full h-full absolute top-0">&nbsp;</div> 
   
   
    <div class="flex items-center w-full justify-between gap-1.5 px-1.5 relative z-10">
   <div class="bg-white font-semibold text-black w-10/12 rounded-full p-2">
   <p class="text-nowrap max-w-full truncate">${data.posts[index].title}</p> 
   
   </div>
<button class="bg-white group cursor-pointer rounded-full text-black p-2 aspect-square" onclick="handleBlogRedirect(${data.posts[index].id})">

<svg class="group-hover:rotate-[45deg] transition duration-100" width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 34L34 14M34 14H14M34 14V34" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>




</button>
   </div> 
    
    
    </div>
    
    
    `
})
}catch(e){
    console.log(e)
}
}
getData();