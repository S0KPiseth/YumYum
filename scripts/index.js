const imageUrls = [
  'assets/images/home/image1.png',
  'assets/images/home/image2.png',
  'assets/images/home/image3.png',
];

const loadingImage = document.getElementById("loadingImage");
const loadingDiv = document.querySelector(".loadingDiv");

const falafelFrames = [
  "assets/images/loading/falafel1.webp",
  "assets/images/loading/falafel2.webp",
  "assets/images/loading/falafel3.webp",
  "assets/images/loading/falafel4.webp",
];

let falafelLoaded = [];

function preloadImages(urls) {
  return Promise.all(
    urls.map(url => {
      return new Promise(resolve => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
      });
    })
  );
}

preloadImages(falafelFrames).then(images => {
  falafelLoaded = images;
  loadingImage.src = images[0].src;

  let loadProgress = 0;
  const total = imageUrls.length;

  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      loadProgress++;

      const percentage = Math.round((loadProgress / total) * 100);

      let frame = Math.floor((percentage / 100) * falafelLoaded.length);
      if (frame >= falafelLoaded.length) frame = falafelLoaded.length - 1;

      loadingImage.src = falafelLoaded[frame].src;

      if (frame === falafelLoaded.length - 1) {
        loadingDiv.classList.add("hidden");
      }
    };

    img.onerror = () => loadProgress++;
  });
});







const magicBtn = document.getElementById("magicBtn");

magicBtn.addEventListener("click", ()=>{
fetch('https://themealdb.com/api/json/v1/1/random.php').then(res=>res.json()).then(data=>{
  localStorage.setItem("mealId",data.meals[0].idMeal)
  
}).catch(e=>console.log(e))





})