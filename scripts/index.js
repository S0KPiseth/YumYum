const countryFlags = ["gb", "us", "fr", "ca", "jm", "cn", "nl", "eg", "gr", "in", "ie", "it", "jp", "kn", "my", "mx", "ma", "hr", "no", "pt", "ru", "ar", "es", "sk", "th", "sa", "vn", "tr", "sy", "dz", "tn", "pl", "ph", "ua", "uy", "au", "ve"];

const imageUrls = ["assets/images/home/image1.png", "assets/images/home/image2.png", "assets/images/home/image3.png"];
const falafelFrames = ["assets/images/loading/falafel1.webp", "assets/images/loading/falafel2.webp", "assets/images/loading/falafel3.webp", "assets/images/loading/falafel4.webp"];
const loadingImage = document.getElementById("loadingImage");
const loadingDiv = document.querySelector(".loadingDiv");

let falafelLoaded = [];
let selectedCountry = "British";

function preloadImages(urls) {
  return Promise.all(
    urls.map((url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
      });
    })
  );
}

const handleHoverMagic = () => {
  const hero = document.querySelector(".hero");
  const altHero = document.querySelector(".altHero");
  hero.classList.add("-translate-x-[200%]");

  altHero.classList.remove("translate-x-full");
};
const handleBlur = () => {
  const hero = document.querySelector(".hero");
  const altHero = document.querySelector(".altHero");
  hero.classList.remove("-translate-x-[200%]");

  altHero.classList.add("translate-x-full");
};

preloadImages(falafelFrames).then((images) => {
  falafelLoaded = images;
  loadingImage.src = images[0].src;

  let loadProgress = 0;
  const total = imageUrls.length;

  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      loadProgress++;

      const percentage = Math.round((loadProgress / total) * 100);

      let frame = Math.floor((percentage / 100) * falafelLoaded.length);
      if (frame >= falafelLoaded.length) frame = falafelLoaded.length - 1;

      loadingImage.src = falafelLoaded[frame].src;

      // class="text-black w-[98vw]  px-2 mx-auto pt-2 nav opacity-0">
      if (frame === falafelLoaded.length - 1) {
        loadingDiv.classList.add("hidden");
        document.body.innerHTML = `

        <header
            class="text-black w-[98vw]  px-2 mx-auto pt-2">
            <nav
                class="px-7 py-4 grid grid-cols-3 grid-rows-1 relative bg-white rounded-4xl">
                <ul class="flex col-start-1 gap-x-10 items-center" id="navUL">
                    <li class="active">
                        <a href="index.html">Home</a>
                    </li>

                    <li>
                        <a href="cooking.html">Cooking</a>
                    </li>

                    <li class="flex items-center">
                        <a href="ingredient.html" class="flex items-center">
                            Ingredients
                            <svg width="22" height="22" viewBox="0 0 22 22"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 8.25L11 13.75L16.5 8.25"
                                    stroke="white" stroke-width="4"
                                    stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </a>
                    </li>

                    <li>
                        <a href="blog.html">Blog</a>
                    </li>
                </ul>

                <p
                    class="col-start-2 text-center font-['Paranoid_Starting'] text-2xl">YuMYuM</p>
		<div class="flex items-center justify-end rounded-full">
        <p>Cuisine: </p>
        
        <div name="cuisine" class="cuisine flex flex-col relative w-20 group" tabindex="0">
        <div  class="border border-white group-focus:border-black group-focus:outline-0 border-b-0 flex items-center justify-between p-1.5" >

        <img id="flagDisplay" class="h-5 w-8 aspect-video"/>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 8.25L11 13.75L16.5 8.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        
        
        </div>
        <div class="w-full h-80 absolute top-full left-0 bg-white z-40 overflow-y-scroll border rounded-b-xl border-t-0 hidden group-focus:block" id = "dropDownDiv"></div>
        </div>

		</div>
        </header>
        

        <div
            class="w-screen justify-center flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
                class="w-3/9 bg-[url('../assets/images/home/image2.png')] aspect-square bg-center bg-cover">
                &nbsp;
            </div>
        </div>

        <div class="w-screen justify-center flex">

            <p
                class="text-[26vw] text-nowrap uppercase font-['aalto'] absolute top-[55%] -translate-x-1/2 -translate-y-1/2 hero left-1/2 opacity-0 transition duration-1000">
                pick. cook. wow.</p>
                    <p
            class="text-[26vw] text-nowrap uppercase font-['aalto'] absolute top-[55%] -translate-x-1/2 -translate-y-1/2 translate-x-full left-1/2 transition duration-2000 altHero">Get Random Meal</p>
        </div>

        <div
            class="w-screen justify-between flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
                class=" w-2/7 bg-[url('./assets/images/home/image1.png')] aspect-square bg-center bg-cover opacity-animation opacity-0">
                &nbsp;
            </div>

            <div
                class="w-2/7 bg-[url('./assets/images/home/image3.png')] aspect-square bg-center bg-cover opacity-animation opacity-0">
                &nbsp;
            </div>
        </div>

        <button
            id="magicBtn"

            class="opacity-0 bg-white rounded-full p-4.5 absolute top-7/8 left-1/2 -translate-x-1/2 -translate-y-1/2"><svg
                class="cursor-pointer"
                width="35" height="35" viewBox="0 0 47 47" fill="non2"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M21.886 22.5795C22.9561 21.0775 22.8367 19.4957 22.0946 16.6504C20.6271 11.0231 21.2115 7.9387 26.2705 4.28706L28.7397 2.50476L29.337 5.49089C29.9717 8.66443 31.014 10.6273 33.6903 14.4028C33.7967 14.5528 33.7967 14.5528 33.9035 14.7034C37.7586 20.1422 39.1667 23.4209 39.1667 29.375C39.1667 36.598 31.8647 43.0833 23.5 43.0833C15.1348 43.0833 7.83333 36.5989 7.83333 29.375C7.83333 29.2399 7.83347 29.244 7.8106 28.6473C7.63365 24.0322 8.48705 20.4202 11.9401 16.5202C12.6697 15.6962 13.499 14.9042 14.4322 14.1464L16.4923 12.4735L17.4833 14.9353C18.2156 16.7544 19.0736 18.1844 20.0428 19.2337C20.8637 20.1225 21.4726 21.2402 21.886 22.5795ZM14.8725 19.1165C12.2144 22.1188 11.5824 24.7936 11.7244 28.4973C11.7508 29.1868 11.75 29.1625 11.75 29.375C11.75 34.3254 17.2012 39.1666 23.5 39.1666C29.7983 39.1666 35.25 34.3246 35.25 29.375C35.25 24.3973 34.1371 21.8061 30.7081 16.9683C30.6019 16.8185 30.6019 16.8185 30.495 16.6678C28.4126 13.73 27.1713 11.6865 26.35 9.40097C25.0089 11.0081 25.0877 12.6065 25.8845 15.662C27.3521 21.2893 26.7677 24.3737 21.7087 28.0253L18.824 30.1075L18.6078 26.5565C18.4696 24.2877 17.9561 22.7471 17.1656 21.8912C16.3845 21.0455 15.6793 20.0555 15.047 18.9229C14.988 18.9873 14.9298 19.0518 14.8725 19.1165Z"
                    fill="black" />
            </svg>
        </button>
    </div>
        
        
        
        `;

        const magicBtn = document.getElementById("magicBtn");
        const cuisine = document.querySelector(".cuisine");
        const dropDownDiv = document.getElementById("dropDownDiv");
        const flagDisplay = document.getElementById("flagDisplay");
        countryFlags.forEach((e) => {
          fetch(`https://restcountries.com/v3.1/alpha/${e}`, { method: "GET" })
            .then((res) => res.json())
            .then((data) => {
              console.log(data[0].flags.png);
              const itemDiv = document.createElement("div");
              itemDiv.className = "h-fit flex justify-between gap-x-2 hover:bg-gray-400 items-center p-1.5 cursor-pointer";

              const flagImg = document.createElement("img");
              flagImg.src = data[0].flags.png;
              flagImg.className = "h-5 w-8 aspect-video";

              const countryCode = document.createElement("p");
              countryCode.className = "grow";
              countryCode.textContent = data[0].cca2;

              itemDiv.addEventListener("click", () => {
                flagDisplay.setAttribute("src", data[0].flags.png);
                document.body.focus();
                selectedCountry = data[0].demonyms.eng.m;
              });

              itemDiv.appendChild(flagImg);
              itemDiv.appendChild(countryCode);

              dropDownDiv.appendChild(itemDiv);

              if (e === "gb") {
                flagDisplay.setAttribute("src", data[0].flags.png);
              }
            });
        });
        magicBtn.addEventListener("mouseover", handleHoverMagic);
        magicBtn.addEventListener("mouseout", handleBlur);

        magicBtn.addEventListener("click", () => {
          console.log("hi");
          fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCountry}`)
            .then((res) => res.json())
            .then((data) => {
              const mealList = data.meals;

              localStorage.setItem("foodId", mealList[Math.floor(Math.random() * mealList.length)].idMeal);
              window.location.href = "/each_food.html";
            })
            .catch((e) => console.log(e));
        });
      }
    };

    img.onerror = () => loadProgress++;
  });
});
