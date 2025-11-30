
const blogTittle = document.getElementById("blogTitle");
const blogContent = document.getElementById("blogContent");

async function init (){
const id = localStorage.getItem("blogId");
if(!id) window.location.href="/blog.html"
try{

const res = await fetch('assets/blog/blog.json', {method:"GET"})
const data = await res.json();
const {posts} = data;

posts.forEach(e=>{
    console.log(e.id)
   if (e.id == id) {
    console.log(e.title);
    blogTittle.textContent = e.title;

    blogContent.innerHTML = `
        <div class="mb-6">
            <h2 class="text-3xl font-bold mb-2">Introduction</h2>
            <p>${e.content.introduction}</p>
        </div>

        <div class="mb-6">
            <h2 class="text-3xl font-bold mb-2">Image</h2>
            <div class="bg-[url(${e.image})] bg-center bg-cover bg-no-repeat w-full aspect-video">&nbsp;</div>
        </div>

        <div class="mb-6">
            <h2 class="text-3xl font-bold mb-2">History</h2>
            <p>${e.content.history}</p>
        </div>

        <div class="mb-6">
            <h2 class="text-3xl font-bold mb-2">Cultural Significance</h2>
            <p>${e.content.cultural_significance}</p>
        </div>

        <div class="mb-6">
            <h2 class="text-3xl font-bold mb-2">Global Influence</h2>
            <p>${e.content.global_influence}</p>
        </div>

        <div class="mb-6">
            <h2 class="text-3xl font-bold mb-2">Interesting Facts</h2>
            <p>${e.content.interesting_facts}</p>
        </div>

        <div class="mb-6">
            <h2 class="text-3xl font-bold mb-2">Conclusion</h2>
            <p>${e.content.conclusion || ''}</p>
        </div>
    `;
}
})

}catch(e){
    console.log(e)
}
}
init();