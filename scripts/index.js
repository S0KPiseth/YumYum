const countryFlags = ["gb", "us", "fr", "ca", "jm", "cn", "nl", "eg", "gr", "in", "ie", "it", "jp", "kn", "my", "mx", "ma", "hr", "no", "pt", "ru", "ar", "es", "sk", "th", "sa", "vn", "tr", "sy", "dz", "tn", "pl", "ph", "ua", "uy", "au", "ve"];
const initialLoad = ["/assets/images/home/image2.png", "/assets/images/home/image2-reverse.png"];
const imageUrls = ["assets/images/home/image1.png", "assets/images/home/image3.png", "assets/images/loading/falafel1.webp", "assets/images/loading/falafel2.webp", "assets/images/loading/falafel3.webp", "assets/images/loading/falafel4.webp"];
const loadingImage = document.getElementById("loading");
const loadingDiv = document.querySelector(".loadingDiv");
const loadingIndicator = document.getElementById("loadingIndicator");
const elementLeft = document.getElementById("elementLeft");
const elementRight = document.getElementById("elementRight");
const nav = document.getElementById("nav");
const magicBtn = document.getElementById("magicBtn");
const cuisine = document.querySelector(".cuisine");
const dropDownDiv = document.getElementById("dropDownDiv");
const flagDisplay = document.getElementById("flagDisplay");
const hero = document.querySelector(".hero");

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
  if (hero.classList.contains("delay-700")) {
    hero.classList.remove("delay-700");
  }
  const altHero = document.querySelector(".altHero");
  hero.classList.add("-translate-x-[200%]");

  altHero.classList.remove("translate-x-full");
};
const handleBlur = () => {
  const altHero = document.querySelector(".altHero");
  hero.classList.remove("-translate-x-[200%]");
  altHero.classList.add("translate-x-full");
};

preloadImages(initialLoad).then((images) => {
  let index = 0;
  const loadingID = setInterval(() => {
    loadingImage.style.backgroundImage = `url("${images[index].src}")`;
    index = index === 0 ? 1 : 0;
  }, 100);
  loadingImage.style.backgroundImage = `url("${images[0].src}")`;

  let loadProgress = 0;
  const total = imageUrls.length;

  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      loadProgress++;

      const percentage = Math.round((loadProgress / total) * 100);
      loadingIndicator.textContent = `${percentage}%`;
      // class="text-black w-[98vw]  px-2 mx-auto pt-2 nav opacity-0">
      if (percentage === 100) {
        clearInterval(loadingID);
        loadingIndicator.classList.add("translate-y-full");

        loadingImage.classList.add("loadingAnimation");
        elementLeft.classList.remove("-translate-x-[100vw]");
        elementRight.classList.remove("translate-x-[100vw]");
        elementLeft.classList.remove("scale-200");
        elementRight.classList.remove("scale-200");
        magicBtn.classList.remove("translate-y-[20vh]");
        nav.classList.remove("-translate-y-full");
        hero.classList.remove("translate-x-full");

        countryFlags.forEach((e) => {
          fetch(`https://restcountries.com/v3.1/alpha/${e}`, { method: "GET" })
            .then((res) => res.json())
            .then((data) => {
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
