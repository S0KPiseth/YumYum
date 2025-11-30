// Search feature
const searchInput = document.getElementById("search-input");
const searchSuggestionContainer = document.getElementById("container");
let searchQuery = null;
let searchTimeout = null;
searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  searchQuery = e.target.value;
  clearTimeout(searchTimeout);
  if (searchQuery) {
    searchTimeout = setTimeout(() => {
      find_food(searchQuery);
    }, 1000);
  }
});
let length = 0;
const find_food = async () => {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`,
  );
  const suggestions = await resp.json();
  if (length > 0) {
    console.log(length);
    for (let i = 0; i < Math.min(10, length); i++) {
      searchSuggestionContainer.removeChild(
        searchSuggestionContainer.lastElementChild,
      );
    }
  }
  console.log(suggestions);
  if (suggestions["meals"]) {
    for (let i = 0; i < Math.min(10, suggestions["meals"].length); i++) {
      console.log(suggestions["meals"][i]["strMeal"]);
      const a = document.createElement("a");
      a.textContent = suggestions["meals"][i]["strMeal"];
      a.className =
        "hover:bg-[rgba(128,128,128,0.1)] p-3 cursor-pointer w-full";
      a.addEventListener("click", () => {
        localStorage.setItem("foodId", suggestions["meals"][i]["idMeal"]);
        window.location.href = "each_food.html";
      });
      searchSuggestionContainer.appendChild(a);
      searchSuggestionContainer.classList.add("rounded-lg");
    }
    length = suggestions["meals"].length;
  } else {
    length = 0;
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
  res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  foodData = await res.json();
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
    console.log(foodData);
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
  const arr = [];
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
    arr.push(foodData);
  }
};
fetchBulk();
