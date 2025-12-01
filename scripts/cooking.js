//loading logic
const loadingImage = document.getElementById("loadingImage");
const loadingContainer = document.getElementById("loadingContainer");

const playLoading = () => {
  let i = 1;
  const intervalID = setInterval(() => {
    if (i > 4) {
      i = 1;
    }
    // loadingContainer.className =
    //   "block w-screen h-screen flex items-center justify-center bg-white absolute";
    loadingContainer.classList.add("block");
    loadingImage.src = `assets/images/loading/falafel${i}.webp`;
    i++;
  }, 500);
  return intervalID;
};
//
// Search feature
const searchInput = document.getElementById("search-input");
const searchSuggestionContainer = document.getElementById("container");
let searchQuery = null;
let searchTimeout = null;
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  clearTimeout(searchTimeout);
  if (searchQuery) {
    searchTimeout = setTimeout(() => {
      find_food(searchQuery);
    }, 1000);
  }
  if (searchQuery === "") {
    searchSuggestionContainer.replaceChildren(
      searchSuggestionContainer.firstElementChild,
    );
  }
});
const find_food = async () => {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`,
  );
  const suggestions = await resp.json();
  if (suggestions["meals"]) {
    for (let i = 0; i < Math.min(10, suggestions["meals"].length); i++) {
      const a = document.createElement("a");
      a.textContent = suggestions["meals"][i]["strMeal"];
      a.className =
        "hover:bg-[rgba(128,128,128,0.1)] p-3 cursor-pointer w-full text-white";
      a.addEventListener("click", () => {
        localStorage.setItem("foodId", suggestions["meals"][i]["idMeal"]);
        window.location.href = "each_food.html";
      });
      searchSuggestionContainer.appendChild(a);
      searchSuggestionContainer.classList.remove("rounded-full");
      searchSuggestionContainer.classList.add("rounded-3xl");
    }
  }
};

const foodName = document.getElementById("foodName");
const foodImg = document.getElementById("foodImg");
const btn = document.getElementById("btn");
let timeoutId = null;

const fetchData = async () => {
  let res = null;
  let foodData = null;

  const id = localStorage.getItem("mcotw");
  if (!id || id === "undefined") {
    res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    foodData = await res.json();
    foodData = foodData["meals"][0];
    localStorage.setItem("mcotw", foodData["idMeal"]);
    window.location.reload();
  }
  let timerId = playLoading();
  try {
    loadingContainer.className =
      "block z-100 bg-white inset-0 absolute flex items-center justify-center";
    res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    foodData = await res.json();
  } catch (err) {
    console.log(err);
  } finally {
    // setTimeout(() => {
    //   clearInterval(timerId);
    //   loadingContainer.classList.add("hidden");
    // }, 5000);
    clearInterval(timerId);
    loadingContainer.classList.add("hidden");
  }
  foodData = foodData["meals"][0];
  const aweek = 7 * 24 * 60 * 60;
  localStorage.setItem("mcotw", foodData["idMeal"]);
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    localStorage.removeItem("mcotw");
    res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    foodData = await res.json();
    foodData = foodData["meals"][0];
    localStorage.setItem("mcotw", foodData["idMeal"]);
  }, aweek);

  foodName.textContent = foodData["strMeal"];
  foodImg.src = foodData["strMealThumb"];

  btn.addEventListener("click", () => {
    localStorage.setItem("foodId", foodData["idMeal"]);
    window.location.href = "each_food.html";
  });
};

fetchData();

const foodContainer = document.getElementById("foodContainer");
const fetchBulk = async () => {
  let res = null;
  let foodData = null;
  for (let i = 0; i < 10; i++) {
    res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    foodData = await res.json();
    foodData = foodData["meals"][0];
    const img = document.createElement("img");
    img.className = "w-1/4 cursor-pointer hover:scale-101 transition-all z-100";
    img.alt = foodData["strMeal"];
    img.src = foodData["strMealThumb"];
    img.title = foodData["strMeal"];
    img.id = foodData["idMeal"];

    img.addEventListener("click", () => {
      localStorage.setItem("foodId", img.id);
      window.location.href = "each_food.html";
    });
    foodContainer.appendChild(img);
  }
};
fetchBulk();
