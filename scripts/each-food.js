const foodName = document.getElementById("food-name");
const flag = document.getElementById("flag");
const bgImg = document.getElementById("bg-img");
const description = document.getElementById("description");
const country_name = document.getElementById("country-name");
const btn = document.getElementById("btn");
const loadingImage = document.getElementById("loadingImage");
const loadingContainer = document.getElementById("loadingContainer");

const playLoading = () => {
  let i = 1;
  const intervalID = setInterval(() => {
    if (i > 4) {
      i = 1;
    }
    loadingImage.src = `assets/images/loading/falafel${i}.webp`;
    i++;
  }, 500);
  return intervalID;
};

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
});
let length = 0;
let desp = null;
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

let foodData = null;

async function fetchData() {
  let foodId = localStorage.getItem("foodId");
  let timerId = playLoading();
  if (foodId === "undefined") {
    foodId = 52973;
  }
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`,
    );
    foodData = await response.json();
  } catch (err) {
    console.log(err);
  }
  btn.addEventListener("click", () => {
    // To chang dynamically
    const id = foodData["meals"][0]["idMeal"];
    localStorage.setItem("foodId", id);
    window.location.href = "detail-cooking.html";
  });
  const countryName = foodData["meals"][0]["strArea"].toLowerCase();

  //
  // To Change dynamically
  const foodNameStr = foodData["meals"][0]["strMeal"];
  foodName.textContent = foodNameStr;
  const token = "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";

  let flagData = null;
  const header = document.getElementById("header");
  try {
    header.className = "hidden";
    loadingContainer.className =
      "block absolute w-screen h-screen flex justify-center items-center inset-0";
    const flagResp = await fetch(
      `https://restcountries.com/v3.1/demonym/${countryName}`,
    );
    flagData = await flagResp.json();
    const resp = await fetch(
      `https://router.huggingface.co/v1/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.2-3B-Instruct",
          messages: [
            {
              role: "user",
              content: `Write a delicious 2 sentences catching phrases description for the dish: ${foodNameStr} and no double quotes`,
            },
          ],
          max_tokens: 100,
          stream: false,
        }),
      },
    );
    desp = await resp.json();
  } catch (err) {
    console.log(err);
  } finally {
    header.className = "block";
    clearInterval(timerId);
    loadingContainer.className = "hidden";
  }
  description.textContent = desp.choices[0].message.content;

  if (flagData[0]) {
    const flag_png = flagData[0]["flags"]["png"];
    flag.src = flag_png;
    flag.title = countryName;
    country_name.className = "hidden";
    flag.className = "block w-15";
  } else {
    country_name.textContent = foodData["meals"][0]["strArea"];
    country_name.className = "block text-3xl ";
    flag.className = "hidden";
  }

  const imgSrc = foodData["meals"][0]["strMealThumb"];
  bgImg.className = `bg-[url(${imgSrc})] bg-center bg-no-repeat bg-cover text-white w-screen font-['Geist'] overflow-x-hidden h-screen relative after:bg-[rgba(0,0,0,0.5)] after:absolute after:inset-0 after:-z-1`;
}
fetchData();
